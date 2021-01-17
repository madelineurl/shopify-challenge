import React from "react";

const SearchResults = ({ searchData, addMovie, checkID, error }) => {
  const results = searchData || [];

  return (
    <ul className="search-results container">
      {
        results.length ? (
          results.map(movie => (
            <li key={movie.imdbID} className="card container">
               <h4 className='card-title'>
                {movie.Title} ({movie.Year})
              </h4>
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
              />
              {/* <h4 className='card-title'>
                {movie.Title} ({movie.Year})
              </h4> */}
              <button
                onClick={() => addMovie(movie)}
                disabled={checkID(movie)}
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
