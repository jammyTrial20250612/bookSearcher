// mock/storage.ts
import type User from "../types";
import type { Book } from "../types";
import { initialMockUsers } from "./Users";
import { initialMockBooks } from "./Books";

const STORAGE_KEY = "mockUsers";
const STORAGE_SECOND_KEY = "mockBooks";

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


export const loadBooks = (): Book[] => {
  const stored = localStorage.getItem(STORAGE_SECOND_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem(STORAGE_SECOND_KEY, JSON.stringify(initialMockBooks));
    return [...initialMockBooks];
  }
};

export const saveBooks = (books: Book[]) => {
  localStorage.setItem(STORAGE_SECOND_KEY, JSON.stringify(books));
};