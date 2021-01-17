import React from "react";

const SearchResults = ({ searchData, addMovie, checkID, error }) => {
  const results = searchData || [];

  return (
    <ul className="search-results container">
      {
        results.length ? (
          results.map(movie => (
            <li key={movie.imdbID} className="card container">
              <img
                src={
                  movie.Poster === 'N/A' ?
                  'https://i.ibb.co/d2B7tK6/default-movie.png' : movie.Poster
                }
                alt={`${movie.Title} poster`}
              />
              <span className="container">
                <h5>
                  {movie.Title} ({movie.Year})
                </h5>
              </span>
              <button
                onClick={() => addMovie(movie)}
                disabled={checkID(movie)}
                className="btn"
              >
                  Nominate
              </button>
            </li>
          ))
        ) : <div>{error}</div>
      }
  </ul>
  );
};

export default SearchResults;
