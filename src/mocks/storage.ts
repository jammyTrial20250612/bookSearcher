// mock/storage.ts
import type User from "../types";
import { initialMockUsers } from "./Users";

const STORAGE_KEY = "mockUsers";

export const loadUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockUsers));
    return [...initialMockUsers];
  }
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};
