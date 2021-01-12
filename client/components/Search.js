/* eslint-disable no-console */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../secrets";

const Search = () => {
  // refactor to useReducer?
  const [searchVal, setSearchVal] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [msg, setMsg] = useState('');

  // when component mounts, fetch previous search data from local storage if present
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('nominations'));
    if (savedList) setSearchData(savedList);
  }, []);

  const handleChange = (evt) => {
    setSearchVal(evt.target.value);
  };

  const handleSearch = async (searchVal) => {
    try {
      if (searchVal === '') {
        alert('Please enter a search value');
      } else {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?s=${searchVal}&apikey=${process.env.API_KEY}&type=movie`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addMovie = async (movie) => {
    if (movieList.length < 5) {
      try {
        const { data } = await axios.post('/movies', movie);
        if (data) {
          setMovieList([...movieList, data.imdbID]);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('You have already selected 5 movies! Please remove a movie to add a different one.');
    }
  };

  // console.log('movieList', movieList);
  return (
    <>
      <form method="GET" >
        <input
          type="text"
          name="search"
          onChange={handleChange}
          className="search"
          value={searchVal}
          onKeyPress={
            (evt) => {
              if (evt.key === 'Enter') {
                evt.preventDefault();
                handleSearch(searchVal);
              }
            }
          }
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => { handleSearch(searchVal); }}
         >
            Search
        </button>
      </form>
      <hr/>
      <ul className="list-unstyled movie-listing">
        {
          searchData.length ? (
            searchData.map(movie => (
              <li key={movie.imdbID} className='card'>
                <div className='card-body'>
                  <img
                    className='card-img-top'
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                  />
                  <h4 className='card-title'>
                    {movie.Title}
                  </h4>
                  <h5 className='card-subtitle mb-2 text-muted' >
                    {movie.Year}
                  </h5>
                  <button
                    onClick={() => addMovie(movie)}
                    disabled={movieList.includes(movie.imdbID)}
                  >
                      Add movie
                  </button>
                </div>
              </li>
            ))
          ) : <div>{msg}</div>
        }
        </ul>
    </>
  );
};

export default Search;
