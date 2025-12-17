// mock/api.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockUsers } from "./Users";
export const setupMock = () => {
   const mock = new MockAdapter(axios);
   mock.onGet("/api/users").reply(200, mockUsers);
};