import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'


export const MovieContext = createContext()

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FULL_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({children}) => {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    getirMovie(FULL_API)       //ilk seferde son cikan 20 filmi getiriyor. Arama yapildiginda getorMovies fonksiyonuyla getirmek icin asagidaki fonksiyonun parametresini url yaptik.
  }, [])
  
  const getirMovie = (url) => {        //Eger dataya cok yerde ihtiyacin olacaksa bir fonksiyon icine alip useEffect'le sarmallaman iyi olur
    axios.get(url).then((res) => {
      setMovie(res.data.results)
  } )
  }
  

  return (
    <MovieContext.Provider value={{movie, getirMovie}}>  {/* iki süslüyü unutma */}
      {children}
      </MovieContext.Provider>
  )
}

export default MovieContextProvider