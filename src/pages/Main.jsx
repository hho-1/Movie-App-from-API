import React, {useContext, useState} from "react";
import {MovieContext} from "../context/MovieContext"
import MovieCard from "../components/MovieCard"


const Main = ({darkMode}) => {

  const {movie, getirMovie} = useContext(MovieContext)
  const [search, setSearch] = useState("")

  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const handleSubmit = (e) => {
    e.preventDefault()
    getirMovie(SEARCH_API + search)
    setSearch("")
  }

  return (
    <div>
      <form className={`searchForm flex justify-center p-2 mt-10 ${darkMode ? "dark" : ""}`} onSubmit={handleSubmit}>
        <input
          type="search"
          id="search"
          value={search}
          className={`w-80 h-8 rounded-md p-1 m-2 searchInput text-lg`}
          placeholder="Search a movie..."
          onChange={(e)=> setSearch(e.target.value)}
        />
        {
          search ? 
            <button className="btn-danger-bordered" type="submit">
              Search
            </button> 
          :
            <button className="btn-danger-bordered disabled:opacity-75 disabled:pointer-events-none" disabled>
              Search
            </button>
        }
        
      </form>
      <div className="flex justify-center flex-wrap">
        {
          movie.map((a) => <MovieCard darkMode={darkMode} key={a.id} {...a} />)
        }
      </div>
    </div>
  );
};

export default Main;
