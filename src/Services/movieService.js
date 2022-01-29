import http from './httpServices';
import config from '../components/config.json';

export function getMovies() {
    return http.get(config.apiEndpointMovie)
}

export function deleteMovie(movieId) {
    return http.delete(config.apiEndpointMovie + "/" +  movieId );
}

export function saveMovie(movie) {
   return http.post(config.apiEndpointMovie, movie);
}