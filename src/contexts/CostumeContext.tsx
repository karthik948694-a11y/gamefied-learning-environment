import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { costumes as defaultCostumes, type CostumeItem, type CostumeSlot } from "@/lib/gameData";
import type { EquippedCostume } from "@/components/CharacterDisplay";

interface CostumeContextValue {
  items: CostumeItem[];
  equipped: EquippedCostume;
  equip: (id: string) => void;
  purchase: (id: string) => void;
  isOwned: (id: string) => boolean;
}

const CostumeContext = createContext<CostumeContextValue | null>(null);
const STORAGE_KEY = "menorah:costumes:v1";

function loadItems(): CostumeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCostumes;
    const parsed = JSON.parse(raw) as Array<Pick<CostumeItem, "id" | "owned" | "equipped">>;
    const byId = new Map(parsed.map((p) => [p.id, p]));
    // Merge with defaults so newly added costumes appear
    return defaultCostumes.map((c) => {
      const saved = byId.get(c.id);
      return saved ? { ...c, owned: saved.owned, equipped: saved.equipped } : c;
    });
  } catch {
    return defaultCostumes;
  }
}

function saveItems(items: CostumeItem[]) {
  const minimal = items.map((i) => ({ id: i.id, owned: i.owned, equipped: i.equipped }));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
  } catch {
    /* ignore quota errors */
  }
}

export const CostumeProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CostumeItem[]>(() => loadItems());

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const equipped = useMemo<EquippedCostume>(() => {
    const get = (slot: CostumeSlot) =>
      items.find((i) => i.slot === slot && i.equipped)?.emoji ?? "❓";
    return {
      head: get("head"),
      body: get("body"),
      legs: get("legs"),
      accessory: get("accessory"),
    };
  }, [items]);

  const equip = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (!target || !target.owned) return prev;
      return prev.map((i) =>
        i.slot === target.slot ? { ...i, equipped: i.id === id } : i
      );
    });
  }, []);

  const purchase = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, owned: true } : i)));
  }, []);

  const isOwned = useCallback(
    (id: string) => items.find((i) => i.id === id)?.owned ?? false,
    [items]
  );

  return (
    <CostumeContext.Provider value={{ items, equipped, equip, purchase, isOwned }}>
      {children}
    </CostumeContext.Provider>
  );
};

export const useCostumes = () => {
  const ctx = useContext(CostumeContext);
  if (!ctx) throw new Error("useCostumes must be used within CostumeProvider");
  return ctx;
};
