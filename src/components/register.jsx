import { errors } from 'joi-browser';
import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { register } from './../Services/userService';
import auth from '../Services/loginService';

class Register extends Form {
    state = {
        data : {username : '', password : '', fullName : ''},
        errors : {}
    }

    schema = {
        username : Joi.string().required().label('Username').email(),
        password : Joi.string().required().label('Password').min(5),
        fullName : Joi.string().required().label("Name")
    };

    doSubmit = async () => {
        try {
           const response = await register(this.state.data);
           auth.loginWithJwt(response.headers["x-auth-token"])
           window.location = "/";
        }
        catch(ex) {
            if(ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                console.log("error",ex.response.data);
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    };

    render() { 
        
        return <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username", "email")}
                {this.renderInput("password", "Password","password")}
                {this.renderInput("fullName", "Name")}
                {this.renderButton('Register')}
            </form>
        </div>;
    }
}
 
export default Register;