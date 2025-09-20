import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
//import React from "react";
import MovieCard from "./MovieCard";


vi.mock("../lib/tmdb", async () => {
  const actual = await vi.importActual<typeof import("../lib/tmdb")>("../lib/tmdb");
  return {
    ...actual,
    posterUrl: (p: string | null) => (p ? `mock://${p}` : undefined), 
  };
});

const movie = {
  id: 42,
  title: "Babylon",
  poster_path: "/bb.jpg",
  overview: "…",
  release_date: "2022-12-23",
  vote_average: 7.1,
} as const;

it("renders poster, title and year", () => {
  render(
    <ul>
      <MovieCard m={movie as any} onSelect={() => {}} />
    </ul>
  );
  expect(screen.getByRole("img", { name: /babylon/i })).toHaveAttribute("src", "mock:///bb.jpg");
  expect(screen.getByText(/Babylon/i)).toBeInTheDocument();
  expect(screen.getByText(/2022/)).toBeInTheDocument();
});
