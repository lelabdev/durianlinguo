import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export type SessionItem = {
  id: string;
  label: string;
  status: "idle" | "running" | "success" | "error";
};

function createSessionStore() {
  const { subscribe, update, set } = writable<SessionItem[]>([]);

  return {
    subscribe,
    add: (label: string, status: SessionItem["status"] = "idle") =>
      update((items) => [...items, { id: uuid(), label, status }]),
    updateStatus: (id: string, status: SessionItem["status"]) =>
      update((items) =>
        items.map((item) => (item.id === id ? { ...item, status } : item)),
      ),
    remove: (id: string) =>
      update((items) => items.filter((item) => item.id !== id)),
    reset: () => set([]),
  };
}

export const sessionStore = createSessionStore();
