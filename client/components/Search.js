/* eslint-disable no-console */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../secrets";
// import Nominations from "./Nominations";

const Search = () => {
  // holds current search bar contents
  const [searchVal, setSearchVal] = useState('');
  // holds search results to render
  const [searchData, setSearchData] = useState([]);
  // holds current list of nominations
  const [movieList, setMovieList] = useState([]);
  // holds a helpful message in case the response returns no results
  const [msg, setMsg] = useState('');

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
        data.Response === 'True' ? setSearchData(data.Search) : setMsg(data.Error);
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
          setMovieList([...movieList, data.imdbID ]);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('You have already selected 5 movies! Please remove a movie to add a different one.');
    }
  };

  return (
    <>
      {
        movieList.length === 5 && <div>Thanks for your nominations.</div>
      }
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
