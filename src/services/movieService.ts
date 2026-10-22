import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_TOKEN;

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FetchMoviesParams {
  query: string;
  page: number;
}

export async function fetchMovies({
  query,
  page,
}: FetchMoviesParams): Promise<MoviesResponse> {
  const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      language: "uk-UA",
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
