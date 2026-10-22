import type { FormEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("query") ?? "").trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
