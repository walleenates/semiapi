import React, { useEffect, useCallback } from 'react';
import './App.css';

const MovieDetails = ({ details, onClose }) => {
  // Close the details popup when clicking outside of it
  const handleClickOutside = useCallback((event) => {
    const popup = document.getElementById('movie-details-popup');
    if (popup && !popup.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener('click', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div id="movie-details-popup" className="movie-details-popup">
      <div className="movie-details-content">
        <div className="movie-details-header">
          <h2>{details.Title}</h2>
        </div>
        <p>Type: {details.Type}</p>
        <p>Year: {details.Year}</p>
        <p>Synopsis: {details.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
