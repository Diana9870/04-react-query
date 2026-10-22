import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";

// react-paginate is shipped as a CommonJS/UMD bundle. Depending on the bundler's
// interop, the default import can be the module object ({ default: Component })
// instead of the component itself, which crashes React with "Element type is invalid".
const ReactPaginate =
  (ReactPaginateModule as unknown as { default?: typeof ReactPaginateModule })
    .default ?? ReactPaginateModule;

// TMDB does not serve pages beyond 500, even if total_pages is larger.
const MAX_PAGES = 500;

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isFetching, isError, isSuccess, isPlaceholderData } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 0, MAX_PAGES);
  const isEmptyResult = isSuccess && !isPlaceholderData && movies.length === 0;

  useEffect(() => {
    if (isEmptyResult) {
      toast.error("No movies found for your request.");
    }
  }, [isEmptyResult, query]);

  function handleSearch(searchQuery: string): void {
    setQuery(searchQuery);
    setPage(1);
    setSelectedMovie(null);
  }

  function handleSelectMovie(movie: Movie): void {
    setSelectedMovie(movie);
  }

  function handleCloseModal(): void {
    setSelectedMovie(null);
  }

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isFetching && <Loader />}

      {isError && <ErrorMessage />}

      {isSuccess && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
