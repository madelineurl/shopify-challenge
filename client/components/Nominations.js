import React from "react";

const Nominations = ({ movieList, removeMovie }) => {
  const nominations = movieList || [];

  if (!nominations.length) {
    return <h3>No movies nominated yet...</h3>;
  }

  return (
    <div id="nominations">
      <h3>Nominations:</h3>
      <ul>
        {
          nominations.map(movie => (
            <li key={movie.imdbID} >
              {movie.Title} ({movie.Year})
              <button
                className="btn"
                onClick={() => { removeMovie(movie.imdbID); } }>
                  Delete
              </button>
            </li>
          ))
        }
      </ul>
      <div id='votes-remaining'>
        { 5 - nominations.length } to go!
      </div>
    </div>
  );
};

export default Nominations;
