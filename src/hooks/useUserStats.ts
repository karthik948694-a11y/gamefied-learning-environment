import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export interface UserStats {
  xp:                  number;
  xp_to_next_level:    number;
  coins:               number;
  level:               number;
  streak:              number;
  longest_streak:      number;
  total_study_minutes: number;
  daily_goal_met:      boolean;
  last_login_date:     string | null;
}

export interface UserProfile {
  display_name: string;
  avatar_url:   string | null;
}

export const useUserStats = () => {
  const { user } = useAuth();
  const [stats,   setStats]   = useState<UserStats | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) {
      setStats(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [statsRes, profileRes] = await Promise.all([
        api.get('/stats'),
        api.get('/profile'),
      ]);
      setStats(statsRes.data   as UserStats);
      setProfile(profileRes.data as UserProfile);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update stats on the backend and reflect locally
  const updateStats = async (updates: Partial<UserStats>) => {
    if (!user) return;
    try {
      const { data } = await api.put('/stats', updates);
      setStats(data as UserStats);
    } catch (err) {
      console.error('Failed to update stats:', err);
    }
  };

  // Update profile on the backend and reflect locally
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const { data } = await api.put('/profile', updates);
      setProfile(data as UserProfile);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return { stats, profile, loading, updateStats, updateProfile, refetch: fetchData };
};
