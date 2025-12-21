// mock/api.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loadUsers, saveUsers, loadBooks } from "./storage";
import type User from "../types";
import type { Book } from "../types";

export const setupMock = () => {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  // mock.onGet("/api/users").reply(200, mockUsers);
  mock.onGet("/api/users").reply(() => {
    const users = loadUsers();
    return [200, users];
  });

  // mock/api.ts
   mock.onPost("/api/users").reply((config) => {
    const newUser: User = JSON.parse(config.data);
    const users = loadUsers();
    const newId = users.length + 1;
    const userWithId = { ...newUser, id: newId };
    const updatedUsers = [...users, userWithId];
    saveUsers(updatedUsers);
    return [201, userWithId];
  });

  mock.onGet("/api/books").reply(() => {
    const books = loadBooks();
    return [200, books];
  });
};
