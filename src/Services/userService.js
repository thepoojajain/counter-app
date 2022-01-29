import http from './httpServices';
import confing from '../components/config.json';

export function register(user) {
    return http.post(confing.apiEndpointUsers, {
        email : user.username,
        password : user.password,
        name : user.fullName
    }
    )
}