import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';



const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MovieCard = ({title, poster_path, overview, vote_average, id}) => {

  let navigate = useNavigate()

  const {currentUser} = useContext(AuthContext)

  return (
    <div
      className="movie"
      id="container"
      onClick={()=>navigate("/details/" + id)}
    >
      <img
        loading="lazy"
        src={IMG_API + poster_path}
        alt="movie-card"
        className='mb-3'
      />
      <div className="flex align-baseline justify-between p-1 text-white">
        <h5>{title}</h5>

        {currentUser && (
          <span className={`tag ${vote_average < 7 ? "red" : (vote_average > 8 ? "green" : "orange")}`}>    {/* buraya dikkat et. className icine condition girdik */}
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  )
}

export default MovieCard