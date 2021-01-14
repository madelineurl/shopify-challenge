/* eslint-disable no-console */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../secrets";
import Nominations from "./Nominations";

const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [msg, setMsg] = useState('');

  // when the component mounts,
  useEffect(() => {
    const nominations = JSON.parse(localStorage.getItem('nominations'));
    if (nominations) setMovieList(nominations);
    // console.log('nominations inside useeffect', nominations);
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
        data.Response === 'True' ? setSearchData(data.Search) : setMsg(data.Error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addMovie = (movie) => {
    if (movieList.length < 5) {
      setMovieList([...movieList, movie]);
      localStorage.setItem('nominations', JSON.stringify(movieList));
    } else {
      alert('You have already selected 5 movies! Please remove a movie to add a different one.');
    }
  };

  const removeMovie = id => {
    setMovieList(movieList.filter(nomination => nomination.imdbID !== id));
    localStorage.setItem('nominations', JSON.stringify(movieList));
  };

  const checkID = movie => {
    const result = movieList.filter(nomination => nomination.imdbID === movie.imdbID);
    return result.length > 0;
  };

  return (
    <>
      {
        movieList.length === 5 && <div>Thanks for your nominations.</div>
      }
      <Nominations movieList={movieList} removeMovie={removeMovie} />
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
