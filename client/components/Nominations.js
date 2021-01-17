import React, { useState } from "react";

const Nominations = ({ movieList, removeMovie, searchData, landingMsg, clearNominations, setLandingMsg }) => {
  const [listShowing, setListShowing] = useState(false);
  const listClass = listShowing ? 'list active' : 'list';
  const nominations = movieList || [];
  const results = searchData || [];

  const toggleShowList = () => {
    setListShowing(!listShowing);
  };

  if (!nominations.length && !results.length) {
    return <h4>Use the search box below to find your favorite movies</h4>;
  }

  if (nominations.length && landingMsg && !results.length) {
    return (
      <>
        <h3>You have previously saved nominations. Continue adding?</h3>
        <button onClick={() => { setLandingMsg(false); }}>Continue</button>
        <button onClick={clearNominations}>Start over</button>
      </>
    );
  }

  return (
    <div id="nominations">
      <button className="nominations-btn" onClick={toggleShowList}>
        Your nominations ({nominations.length})
      </button>
      <ul className={listClass}>
        {
          nominations.length ? nominations.map(movie => (
            <li key={movie.imdbID} >
              {movie.Title} ({movie.Year})
              <button
                className="btn"
                onClick={() => { removeMovie(movie.imdbID); } }>
                  Delete
              </button>
            </li>
          )) : <div>Nothing here yet!</div>
        }
      </ul>
    </div>
  );
};

export default Nominations;
