import React, { useState, useEffect } from "react";
import axios from "axios";

const Nominations = () => {
  const [currentList, setCurrentList] = useState([]);

  useEffect(async () => {
    try {
      const nominations = await axios.get('/');
      if (nominations) {
        setCurrentList(nominations);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <h2>My Shoppies Nominations</h2>
      <ul>
        {
          currentList.length ? (
            currentList.map(movie => {
              <li key={movie.imdbID}>
                {movie.name}
              </li>;
            })
          ) : <h2>No movies nominated yet...</h2>
        }
      </ul>
    </>
  );
};

export default Nominations;
