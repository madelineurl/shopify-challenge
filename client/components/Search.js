/* eslint-disable no-console */
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../secrets";

const Search = () => {
  const [entry, setEntry] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [msg, setMsg] = useState('');

  // when component mounts, fetch previous search data from local storage if present
  useEffect(() => {
    const lastSearch = JSON.parse(localStorage.getItem('searchData'));
    if (lastSearch) setSearchData(lastSearch);
  }, []);

  const handleChange = (evt) => {
    setEntry(evt.target.value);
  };

  const handleSearch = async (searchVal) => {
    try {
      if (searchVal === '') {
        alert('Please enter a search value');
      } else {
        const { data } = await axios.get(`http://www.omdbapi.com/?s=${searchVal}&apikey=${process.env.API_KEY}&type=movie`);
        localStorage.removeItem('searchData');

        // console.log(data);

        if (data.Response === 'True') {
          setSearchData(data.Search);
          localStorage.setItem('searchData', JSON.stringify(data.Search));
        } else {
          setSearchData([]);
          setMsg(data.Error);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form method="GET" >
        <input
          type="text"
          name="search"
          onChange={handleChange}
          className="search"
          value={entry}
          onKeyPress={
            (evt) => {
              if (evt.key === 'Enter') {
                evt.preventDefault();
                handleSearch(entry);
              }
            }
          }
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => { handleSearch(entry); }}
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
                  <div>
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
                  </div>
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
