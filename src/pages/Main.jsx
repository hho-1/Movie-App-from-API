import React, {useContext, useState} from "react";
import {MovieContext} from "../context/MovieContext"
import MovieCard from "../components/MovieCard"


const Main = () => {

  const {movie, getirMovie} = useContext(MovieContext)
  const [search, setSearch] = useState("")

  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const handleSubmit = (e) => {
    e.preventDefault()
    getirMovie(SEARCH_API + search)
  }

  return (
    <>
      <form className="flex justify-center p-2 mt-10 " onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e)=> setSearch(e.target.value)}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>
      <div className="flex justify-center flex-wrap">
        {
          movie.map((a) => <MovieCard key={a.id} {...a} />)
        }
      </div>
    </>
  );
};

export default Main;
