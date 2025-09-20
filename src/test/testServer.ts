import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";


const TMDB_BASE = "https://api.themoviedb.org/3";

// Sample fixtures
const nowPlaying = {
  results: [
    {
      id: 1,
      title: "M3GAN",
      poster_path: "/m3gan.jpg",
      overview: "A brilliant toy company roboticist…",
      release_date: "2022-12-28",
      vote_average: 6.4,
    },
    {
      id: 2,
      title: "Avatar: The Way of Water",
      poster_path: "/avatar2.jpg",
      overview: "Jake Sully lives with his newfound family…",
      release_date: "2022-12-16",
      vote_average: 7.5,
    },
  ],
total_pages: 2,
};


const details1 = {
  id: 1,
  title: "M3GAN",
  poster_path: "/m3gan.jpg",
  overview: "A brilliant toy company roboticist uses AI to develop M3GAN…",
  release_date: "2022-12-28",
  vote_average: 6.4,
  credits: {
    cast: [
      { id: 100, name: "Allison Williams" },
      { id: 101, name: "Violet McGraw" },
    ],
    crew: [
      { id: 200, name: "Gerard Johnstone", job: "Director" },
      { id: 201, name: "Akela Cooper", job: "Writer" },
    ],
  },
};


const searchJohn = {
  results: [
    {
      id: 3,
      title: "John Wick: Chapter 4",
      poster_path: "/wick4.jpg",
      overview: "With the price on his head ever increasing…",
      release_date: "2023-03-24",
      vote_average: 7.7,
    },
  ],
total_pages: 1,
};
export const handlers = [
// Now playing
http.get(`${TMDB_BASE}/movie/now_playing`, () => {
  return HttpResponse.json(nowPlaying);
}),


// Search
http.get(`${TMDB_BASE}/search/movie`, ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("query")?.toLowerCase() || "";
  if (q.includes("john")) return HttpResponse.json(searchJohn);
  return HttpResponse.json({ results: [], total_pages: 1 });
}),


// Details
http.get(`${TMDB_BASE}/movie/:id`, ({ params }) => {
  if (params.id === "1") return HttpResponse.json(details1);
  return HttpResponse.json({ id: Number(params.id) });
}),
];


export const server = setupServer(...handlers);