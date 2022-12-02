import React, {useState, useEffect, useCallback}from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies]= useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]= useState(null)

  const fetchMoviesHandler = useCallback(async()=>{
    setIsLoading(true)
    setError(null)
    try {
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json()
  
   if(!response.ok){
    throw new Error('errrrrr')
   }

    const transformedMovies = data.results.map(movieData =>{
        return {
          id: movieData.episode.id,
          title: movieData.title,
          openingText: movieData.opeing_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
      
  }catch(error){
    setError(error.message)
  }
  setIsLoading(false)
}, [])

useEffect(()=>{
  fetchMoviesHandler()}, [fetchMoviesHandler]
)

let content = <p>Found no movies</p>

if(movies.length>0){
  content = <MoviesList movies={movies}/>
}

if (isLoading){
  content = <p>loading</p>
}

if(error){
  content = <p>{error}</p>
}


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content/* {!isLoading && movies.length>0 && />}
        {isLoading && <p> loading...</p>}
        {!isLoading && movies.length ===0 &&  !error && <p>Found No Movies</p> }
        {!isLoading && error && <p>{error}</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
