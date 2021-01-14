import React from "react";

const SearchResults = ({ searchData, addMovie, checkID, msg }) => {
  const results = searchData || [];

  return (
    <ul className="search-results container">
      {
        results.length ? (
          results.map(movie => (
            <li key={movie.imdbID} className='card container'>
              <div>
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                />
                <h4 className='card-title'>
                  {movie.Title} ({movie.Year})
                </h4>
                <button
                  onClick={() => addMovie(movie)}
                  disabled={checkID(movie)}
                >
                    Add to list
                </button>
              </div>
            </li>
          ))
        ) : <div>{msg}</div>
      }
  </ul>
  );
};

export default SearchResults;
