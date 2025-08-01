import { LocalStorage } from "./localStorage";
import type { Item } from "$lib/types/item";
import { v4 as uuidv4 } from "uuid";

function createItemStore() {
  const store = new LocalStorage<Item[]>("itemStore", []);

  function add(name: string) {
    const item: Item = { id: uuidv4(), name };
    store.value = [...store.value, item];
  }

  function remove(id: string) {
    store.value = store.value.filter((item) => item.id !== id);
  }

  function edit(id: string, name: string) {
    store.value =
      store.value.map((item) => (item.id === id ? { ...item, name } : item)),
    ;
  }

  return {
    add,
    remove,
    edit,
    get items() {
      return store.value;
    },
  };
}

export const itemStore = createItemStore();
