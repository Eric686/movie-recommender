export type Movie = {
id: number;
title: string;
name?: string;
poster_path: string | null;
overview: string;
release_date?: string;
first_air_date?: string;
vote_average: number;
};


export type MovieDetails = Movie & {
genres?: { id: number; name: string }[];
runtime?: number;
credits?: {
cast: { id: number; name: string; character?: string }[];
crew: { id: number; name: string; job?: string }[];
};
};