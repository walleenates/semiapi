// App.jsx
import React, { useState, useEffect } from 'react';
import Moviecard from './Moviecard';
import MovieDetails from './MovieDetails';
import './App.css';

const API_URL = "http://www.omdbapi.com?apikey=e7f36e48";

const App = () => {
  const [movies, setMovies] = useState("");
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (title) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies(movie);
    }
  };

  const handleMovieClick = (selectedMovie) => {
    setSelectedMovie(selectedMovie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleHomeButtonClick = () => {
    searchMovies("Apocalypse");
  };

  useEffect(() => {
    searchMovies("Apocalypse");
  }, []);

  return (
    <div className="app">
      <img src="video-player.png" alt="icon" />
      <h1>Movie Mara</h1>

      <div className="search"> 
        <input
          placeholder="Search for movies"
          onChange={(e) => setMovie(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => searchMovies(movie)}>Search</button>
        <button onClick={handleHomeButtonClick}>Home</button>
      </div>

      {loading && <p>Loading...</p>}

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((m) => (
            <div
              className="movie-card clickable"
              key={m.imdbID}
              onClick={() => handleMovieClick(m)}
            >
              <Moviecard props={m} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No movies found!</h3>
        </div>
      )}

      {selectedMovie && (
        <MovieDetails details={selectedMovie} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default App;
