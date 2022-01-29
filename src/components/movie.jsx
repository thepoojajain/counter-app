import React, { Component } from 'react';
import { getMovies, deleteMovie } from "../Services/movieService";
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import {getGenres} from "../Services/genreService";
import ListGroup from '../utils/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Search from './search';
import {toast, ToastContainer} from 'react-toastify';

class Movie extends React.Component {
    state = {
      movies : [],
      pageSize : 4,
      currentPage : 1,
      genres : [],
      sortColumn : {path : 'title', order : 'asc'},
      searchQuery : "",
      selectedGenre : null
    };

    async componentDidMount() {
      const { data } = await getGenres();
      const {data : movies} = await getMovies();
      const genres = [{ _id : '', name : "All Genres"}, ...data];
      this.setState({movies , genres})
    }

     getRowAndDelete = async movie =>  { 
       console.log('here', movie);
         const originalMovies = this.state.movies;
         const movies = originalMovies.filter(m => m._id !== movie._id);
         this.setState({movies : movies})
         console.log('here11', movies);

         try{
          await deleteMovie(movie._id);
         }catch(e) {
          if(e.response && e.response.status === 404 ) {
            toast.error(' The movie has already deleted')
          } 
          this.setState({movies : originalMovies});
         }
     };
     
     handlePageChange = page => {
       this.setState({currentPage : page});
     };
     
     handleGenreSelect = genre => {
      this.setState({selectedGenre : genre, currentPage : 1});

     };

     handleSearch = value => {
      this.setState({searchQuery : value, currentPage : 1})
      console.log('handleseach',this.state.searchQuery);
     };
    
     handleSort = sortColumn => {
      this.setState({sortColumn});
     };

     getPagedData = () => {
      
      const {selectedGenre, sortColumn, currentPage, pageSize,searchQuery} = this.state;
      let filterMovie = this.state.movies;
      if(searchQuery) {
         filterMovie= this.state.movies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
      } else if (selectedGenre && selectedGenre._id) {
       filterMovie = this.state.movies.filter(m => m.genre._id === selectedGenre._id);
      }
       const sorted = _.orderBy(filterMovie,[sortColumn.path], [sortColumn.order]);
     
      const movies = paginate(sorted, currentPage, pageSize);
      return {totalCount : filterMovie.length, data : movies}
     }

    render() { 
        const {length : count} = this.state.movies;
        const {selectedGenre, sortColumn, searchQuery} = this.state;
        const {user} = this.props;

        if(count === 0 ) return <p>There are no movies in the data base</p>
       
        const { totalCount, data :movies} = this.getPagedData();
        
        return (
        <React.Fragment>
          <ToastContainer />
          <div className='row'>
             <div className="col-3">
               <ListGroup items={this.state.genres}
               selectedItem = {selectedGenre}
               onItemSelect={this.handleGenreSelect}/>
             </div>
             <div className="col">
             {user && <Link to="/movie/newMovie">
                <button className="btn btn-primary m-2">New Movie</button>
                </Link> }
          
               <p>Showing {totalCount} movie in the database</p>
                <Search name={searchQuery} onChange={this.handleSearch}/>
               <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onDelete = {this.getRowAndDelete}
                onSort = {this.handleSort}
                />
                <Pagination  itemCounts= {totalCount}
                 currentPage={this.state.currentPage}
                  pageSize={this.state.pageSize}
                  onPageChange={this.handlePageChange}/>
             </div>
          </div>
        </React.Fragment>
        );
    }
}
 
export default Movie;