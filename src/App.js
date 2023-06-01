import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import './App.css';
import searchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=c032e2d7';

const movie1 = {
    "Title": "Amazing Spideerman Syndrome",
    "Year": "2012",
    "imdbID": "tt258634",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {
    const [movie, setMovies] = useState([]);
    const [searchTeam, setMoviesTerm] = useState('');

    const searchMovie = async (title) => {
        const responce = await fetch(`${API_URL}&s=${title}`);
        const data = await responce.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovie('spiderman');

    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTeam}
                    onChange={(e) => setMoviesTerm(e.target.value)}
                />

                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovie(searchTeam)}
                />
            </div>

            {
                movie?.length > 0
                    ? (
                        <div className="container">
                            {movie.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No Movies found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;