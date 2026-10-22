import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (query && data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [query, data]);

  function handleSearch(searchQuery: string): void {
    setQuery(searchQuery);
    setPage(1);
    setSelectedMovie(null);
  }

  function handlePageChange({
    selected,
  }: {
    selected: number;
  }): void {
    setPage(selected + 1);
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

      {query && isPending && <Loader />}

      {query && isError && <ErrorMessage />}

      {query && !isPending && !isError && (
        <>
          <MovieGrid
            movies={movies}
            onSelect={handleSelectMovie}
          />

          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
