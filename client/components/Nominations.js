import React, { useState } from "react";

const Nominations = (props) => {
  const {
    movieList,
    removeMovie,
    searchData,
    savedDataMsg,
    clearNominations,
    setSavedDataMsg,
    openSearchBar
  } = props;

  const [listShowing, setListShowing] = useState(false);
  const listClass = listShowing ? 'list-container active' : 'list-container';
  const nominations = movieList || [];
  const results = searchData || [];

  const toggleShowList = () => {
    setListShowing(!listShowing);
  };

  if (!nominations.length && !results.length) {
    return <h4 id="prompt">Click the search icon below to find your favorite movies</h4>;
  }

  if (nominations.length && savedDataMsg && !results.length) {
    return (
      <>
        <h3>You have previously saved nominations. Continue adding?</h3>
        <div className="container">
          <button
            className="btn"
            onClick={() => {
              setSavedDataMsg(false);
              openSearchBar();
            }}
          >
            Continue
          </button>
          <button
            className="btn"
            onClick={clearNominations}
          >
            Start over
          </button>
        </div>
      </>
    );
  }

  return (
    <div id="nominations">
      <button className="nominations btn" onClick={toggleShowList}>
        Your nominations
        {
          nominations.length > 0 &&
            <span className="container">{nominations.length}</span>
        }
      </button>
      <div className={listClass}>
        {
          nominations.length ?
          <ul className="list">
            {
              nominations.map(movie => (
                <li key={movie.imdbID} >
                  <button
                    className="btn"
                    onClick={() => { removeMovie(movie.imdbID); } }>
                      x
                  </button>
                  {movie.Title} ({movie.Year})
                </li>
              ))
            }
          </ul> : <div className="container">Nothing here yet!</div>
        }
      </div>
    </div>
  );
};

export default Nominations;
