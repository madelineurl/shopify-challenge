/* eslint-disable no-console */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../secrets";
import Nominations from "./Nominations";

const Search = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [msg, setMsg] = useState('');

  const searchClass = searchActive ? 'search active' : 'search';

  useEffect(() => {
    const nominations = JSON.parse(localStorage.getItem('nominations'));
    if (nominations) setMovieList(nominations);
  }, []);

  const updateLocalStorage = nominations => {
    localStorage.setItem('nominations', JSON.stringify(nominations));
  };

  const handleChange = (evt) => {
    setSearchVal(evt.target.value);
  };

  const openSearchBar = (searchVal) => {
    if (!searchActive) {
      setSearchActive(true);
      const input = document.querySelector("input");
      input.focus();
    } else {
      handleSearch(searchVal);
    }
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

  const addMovie = (movie) => {
    if (movieList.length < 5) {
      setMovieList([...movieList, movie]);
      updateLocalStorage([...movieList, movie]);
    } else {
      alert('You have already selected 5 movies! Please remove a movie to add a different one.');
    }
  };

  const removeMovie = id => {
    setMovieList(movieList.filter(nomination => nomination.imdbID !== id));
    updateLocalStorage(movieList.filter(nomination => nomination.imdbID !== id));
  };

  const checkID = movie => {
    const result = movieList.filter(nomination => nomination.imdbID === movie.imdbID);
    return result.length > 0;
  };

  return (
    <>
      {
        movieList.length === 5 &&
        <div className="banner">Thanks for your nominations.</div>
      }
      <Nominations movieList={movieList} removeMovie={removeMovie} />
      <form method="GET" className={searchClass}>
        <input
          type="text"
          name="search"
          className="input"
          onChange={handleChange}
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
          type="button"
          onClick={() =>{ openSearchBar(searchVal); }}
         >
            <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <hr/>
      <ul className="search-results">
        {
          searchData.length ? (
            searchData.map(movie => (
              <li key={movie.imdbID} className='card'>
                <div>
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                  />
                  <h4 className='card-title'>
                    {movie.Title}
                  </h4>
                  <h5 >
                    {movie.Year}
                  </h5>
                  <button
                    onClick={() => addMovie(movie)}
                    disabled={checkID(movie)}
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
