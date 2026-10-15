import { useEffect, useState } from "react";

const STORAGE_KEY = "movieshelf-favorites";

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favorites = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      return favorites.some((item) => item.id === movie.id);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const favorites = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setIsFavorite(
        favorites.some((item) => item.id === movie.id)
      );
    } catch {
      setIsFavorite(false);
    }
  }, [movie.id]);

  function toggleFavorite() {
    try {
      const favorites = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      const updatedFavorites = isFavorite
        ? favorites.filter((item) => item.id !== movie.id)
        : [...favorites, movie];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(!isFavorite);
    } catch {
      alert("Unable to save favorites in this browser.");
    }
  }

  return (
    <article className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png"
        }
        alt={`${movie.title} poster`}
        loading="lazy"
      />

      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average?.toFixed(1) ?? "N/A"}</p>

      <button
        type="button"
        onClick={toggleFavorite}
        aria-pressed={isFavorite}
      >
        {isFavorite ? "♥ Remove Favorite" : "♡ Add Favorite"}
      </button>
    </article>
  );
}
