import React, { useState } from "react";

const Nominations = ({ movieList, removeMovie, searchData, landingMsg, clearNominations, setLandingMsg, openSearchBar }) => {
  const [listShowing, setListShowing] = useState(false);
  const listClass = listShowing ? 'list active' : 'list';
  const nominations = movieList || [];
  const results = searchData || [];

  const toggleShowList = () => {
    setListShowing(!listShowing);
  };

  if (!nominations.length && !results.length) {
    return <h4 id="prompt">Click the search icon below to find your favorite movies</h4>;
  }

  if (nominations.length && landingMsg && !results.length) {
    return (
      <>
        <h3>You have previously saved nominations. Continue adding?</h3>
        <div className="container">
          <button className="btn" onClick={() => {
              setLandingMsg(false);
              openSearchBar();
            }}
          >
              Continue</button>
          <button className="btn" onClick={clearNominations}>Start over</button>
        </div>
      </>
    );
  }

  return (
    // nominations.length > 0 && (
    <div id="nominations">
      <button className="nominations btn" onClick={toggleShowList}>
        Your nominations ({nominations.length})
      </button>
      <ul className={listClass}>
        {
          nominations.length ? nominations.map(movie => (
            <li key={movie.imdbID} >
              <button
                className="btn"
                onClick={() => { removeMovie(movie.imdbID); } }>
                  x
              </button>
              {movie.Title} ({movie.Year})
            </li>
          )) : <div>Nothing here yet!</div>
        }
      </ul>
    </div>
    // )
  );
};

export default Nominations;
