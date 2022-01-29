import React, { Component } from 'react';
import Like from './like';
import Table from './common/Table';
import { Link } from 'react-router-dom';
import auth from '../Services/loginService';

class MoviesTable extends React.Component {
    columns = [
        {path : 'title', label : 'Title', content : movie => (<Link to={`/movie/${movie._id}`}>{movie.title}</Link>)},
        {path : 'genre.name', label : 'Genre'},
        {path : 'numberInStock', label : 'Stock'},
        {path : 'dailyRentalRate', label : 'Rate'},
        {key : 'like', content : () => <Like />},
        {key : 'delete', content : movie => (auth.getCurrentUser() && auth.getCurrentUser().isAdmin && <button onClick={() => this.props.onDelete(movie)}
        className='btn btn-danger btn-sm m-2'>Delete</button>
        )
        }
    ];
    render() { 
        const {movies, sortColumn, onSort} = this.props;

    return (  <Table data={movies} 
                sortColumn={sortColumn} 
                onSort={onSort}
                columns={this.columns}
                />
         );
    }
}
 
export default MoviesTable;