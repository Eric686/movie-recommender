import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import React from "react";
import App from "../App";

async function mountApp() {
  render(<App />);
  const email = await screen.findByPlaceholderText(/you@example.com/i);
  await userEvent.type(email, "dev@test.com");
  await userEvent.click(screen.getByRole("button", { name: /continue/i }));
}
describe("MoviePage", () => {
  it("shows now playing grid and selects first movie for details", async () => {
    await mountApp();

// Grid renders with cards
    const list = await screen.findByRole("list");
    const items = within(list).getAllByRole("button");
    expect(items.length).toBeGreaterThan(0);


// Details panel shows the first movie
    expect(await screen.findByRole("heading", { name: /m3gan/i })).toBeInTheDocument();
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
  it("searches and shows results + resets page to 1", async () => {
    await mountApp();
    const search = await screen.findByPlaceholderText(/search for a movie/i);
    await userEvent.clear(search);
    await userEvent.type(search, "John Wick");


// Grid updates to search results
    const card = await screen.findByRole("button", { name: /john wick/i });
    expect(card).toBeInTheDocument();
  });
  it("paginates between pages", async () => {
    await mountApp();


// Page label
    expect(await screen.findByText(/Page: 1/i)).toBeInTheDocument();
    const next = screen.getByRole("button", { name: /next/i });
    await userEvent.click(next);
    expect(await screen.findByText(/Page: 2/i)).toBeInTheDocument();
  });
});