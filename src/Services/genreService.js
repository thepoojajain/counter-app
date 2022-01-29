import http from './httpServices';
import config from '../components/config.json';

export function getGenres() {
     return  http.get(config.apiEndpointGenre);
    }


