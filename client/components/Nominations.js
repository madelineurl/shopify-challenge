import React, { useState, useEffect } from "react";
import axios from "axios";

const Nominations = () => {
  const [currentList, setCurrentList] = useState([]);

  const removeNomination = async id => {
    try {
      await axios.delete(`/movies/${id}`);
      setCurrentList(currentList.filter(nomination => nomination.imdbID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const {data} = await axios.get('/movies');
        if (data) {
          setCurrentList(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <h2>My Nominations</h2>
      <ul>
        {
          currentList.length ? (
            currentList.map(movie => (
              <li key={movie.imdbID}>
                {movie.title} ({movie.year})
                <button
                  onClick={() => { removeNomination(movie.imdbID); } }>
                    Delete
                </button>
              </li>
            ))
          ) : <h2>No movies nominated yet...</h2>
        }
      </ul>
      <div id='votes-remaining'>
        { 5 - currentList.length } nominations remaining
      </div>
    </>
  );
};

export default Nominations;
