
import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movieService";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Home({ searchResults }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies();

        if (!cancelled) {
          setPopularMovies(data.results || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load movies.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  const movies =
    searchResults === null || searchResults === undefined
      ? popularMovies
      : searchResults;

  if (loading && searchResults == null) {
    return <LoadingSpinner />;
  }

  if (error && searchResults == null) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main>
      <h1>{searchResults != null ? "Search Results" : "Popular Movies"}</h1>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <p>No movies found.</p>
      )}
    </main>
  );
}
