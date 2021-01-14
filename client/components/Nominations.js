import React from "react";

const Nominations = ({ movieList, removeMovie }) => {
  const nominations = movieList || [];

  return (
    <>
      <h2>My Nominations</h2>
      <ul>
        {
          nominations.length ? (
            nominations.map(movie => (
              <li key={movie.imdbID}>
                {movie.Title} ({movie.Year})
                <button
                  onClick={() => { removeMovie(movie.imdbID); } }>
                    Delete
                </button>
              </li>
            ))
          ) : <h2>No movies nominated yet...</h2>
        }
      </ul>
      <div id='votes-remaining'>
        { 5 - nominations.length } nominations remaining
      </div>
    </>
  );
};

export default Nominations;
