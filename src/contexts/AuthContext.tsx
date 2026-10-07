import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import api from '@/lib/api';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<{ error: Error | null; isDemo?: boolean }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Helpers ───────────────────────────────────────────────────────────────────
const TOKEN_KEY = 'quest_token';
const USER_KEY  = 'quest_user';

function saveSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: verify token is still valid with /api/auth/me
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    // Optimistically restore user from localStorage while we verify
    const cached = loadUser();
    if (cached) setUser(cached);

    api
      .get('/auth/me')
      .then(({ data }) => {
        const verified: AuthUser = {
          id:          data.id,
          email:       data.email,
          displayName: data.displayName,
        };
        setUser(verified);
        localStorage.setItem(USER_KEY, JSON.stringify(verified));
      })
      .catch(() => {
        // Token invalid or expired
        clearSession();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── signUp ──────────────────────────────────────────────────────────────────
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { data } = await api.post('/auth/signup', { email, password, displayName });
      const authUser: AuthUser = {
        id:          data.user.id,
        email:       data.user.email,
        displayName: data.user.displayName,
      };
      saveSession(data.token, authUser);
      setUser(authUser);
      return { error: null, isDemo: data.isDemo ?? false };
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        (!err.response
          ? 'Backend server is not running on http://localhost:5000. Please start the backend server!'
          : err.message || 'Signup failed');
      return { error: new Error(message) };
    }
  };

  // ── signIn ──────────────────────────────────────────────────────────────────
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const authUser: AuthUser = {
        id:          data.user.id,
        email:       data.user.email,
        displayName: data.user.displayName,
      };
      saveSession(data.token, authUser);
      setUser(authUser);
      return { error: null };
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        (!err.response
          ? 'Backend server is not running on http://localhost:5000. Please start the backend server!'
          : err.message || 'Login failed');
      return { error: new Error(message) };
    }
  };

  // ── signOut ─────────────────────────────────────────────────────────────────
  const signOut = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
