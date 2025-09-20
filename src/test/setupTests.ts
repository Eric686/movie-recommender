import "@testing-library/jest-dom";
import { server } from "./testServer";
import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => {
  localStorage.clear();
});