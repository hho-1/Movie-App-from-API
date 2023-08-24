import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'


export const MovieContext = createContext()

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FULL_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({children}) => {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    getirMovie(FULL_API)
  }, [])
  
  const getirMovie = (url) => {
    axios.get(url).then((res) => {
      setMovie(res.data.results)
  } )
  }
  

  return (
    <MovieContext.Provider value={{movie, getirMovie}}>
      {children}
      </MovieContext.Provider>
  )
}

export default MovieContextProvider