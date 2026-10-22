import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={css.card} onClick={() => onSelect(movie)}>
            {movie.poster_path ? (
              <img
                className={css.image}
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            ) : (
              <div
                className={css.image}
                role="img"
                aria-label={`Poster unavailable: ${movie.title}`}
              >
                Poster unavailable
              </div>
            )}

            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
