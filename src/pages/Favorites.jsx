import MovieGrid from '../components/MovieGrid';

function Favorites() {
  // Placeholder - students will implement localStorage retrieval
  const favoriteMovies = [];

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );  
  import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("movieshelf-favorites") || "[]"
      );

      setFavorites(Array.isArray(saved) ? saved : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  return (
    <main>
      <h1>My Favorite Movies</h1>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <p>You haven't added any favorite movies yet.</p>
      )}
    </main>
  );
}
};

export default Favorites; 
