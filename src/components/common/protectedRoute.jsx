import React from 'react';
import auth from '../../Services/loginService';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({component : Component, render, ...rest}) => {
    return ( <Route
     {...rest}
    render={props => {
     if(!auth.getCurrentUser()) return <Redirect to={
      { pathname : '/login',
       state : {from : props.location} 
      }} />;
     return Component ? <Component {...props} /> : render(props);
   }}/> );
}
 
export default ProtectedRoute;