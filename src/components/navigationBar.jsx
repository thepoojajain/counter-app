import React, { Component } from 'react';
import { Link,  Route, Redirect, NavLink, Switch } from 'react-router-dom';
import Movie from './movie';
import Rentals from './rentals';
import Customers from './customers';
import NotFound from './notFound';
import MovieForm from './movieForm';
import LoginForm from './login';
import Register from './register';
import NewMovie from './newMovie';
import Logout from './common/logout';
import auth from '../Services/loginService';
import ProtectedRoute from './common/protectedRoute';


class NavigationBar extends Component {
  state = {};
  componentDidMount(){
      const user =  auth.getCurrentUser();
      this.setState({user}); 
  } 

  render() { 
    const {user} = this.state;
    return (
      <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Vidly</Link>
          <button className="navbar-toggler" type="button" 
            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link"to='/movie'>
              Movies</NavLink>
            
            <NavLink className="nav-item nav-link" to='/customers'>
            Customers</NavLink>
            
            <NavLink className="nav-item nav-link" to='/rentals'>Rentals</NavLink>
            { !user && <React.Fragment>
              <NavLink className="nav-item nav-link" to='/login'>Login</NavLink>
              <NavLink className="nav-item nav-link" to='/register'>Register</NavLink>
            </React.Fragment>}
            { user && <React.Fragment>
              <NavLink className="nav-item nav-link" to='/profile'>{user.name}</NavLink>
              <NavLink className="nav-item nav-link" to='/logout'>Logout</NavLink>
            </React.Fragment>}
          </div>
        </div>
    </nav>
    <div>
    <Switch>
      <Route path='/login' component={LoginForm}/>
      <Route path='/logout' component={Logout}/>
      <ProtectedRoute path='/movie/newMovie'  component={NewMovie}/>
      <ProtectedRoute path='/movie/:id'  component={MovieForm}/>
      <Route path='/movie' 
       render={props => <Movie {...props} user={user} /> } />
       <Route path='/customers' component={Customers}/>
       <Route path='/rentals' component={Rentals}/>
       <Route path='/notFound' component={NotFound}/>
       <Route path='/register' component={Register}/>
       <Redirect from="/" exact to= "/movie" />
       <Redirect to='/notFound' />
      
    </Switch>
    </div>
    </React.Fragment>
     );
  }
}
 
export default NavigationBar ;
