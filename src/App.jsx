import { useState } from "react";
import { searchMovies } from "./services/movieService";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState("");

  async function handleSearch(query) {
    if (!query.trim()) {
      setSearchResults(null);
      setSearchError("");
      return;
    }

    try {
      setSearchError("");

      const data = await searchMovies(query);
      setSearchResults(data.results || []);
    } catch (err) {
      setSearchError(err.message || "Search failed.");
      setSearchResults([]);
    }
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      {searchError && <p role="alert">{searchError}</p>}
      <Home searchResults={searchResults} />
    </>
  );
}
