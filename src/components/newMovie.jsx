import React, { Component } from 'react';
import Form from './common/form';
import joi from 'joi-browser';
import { saveMovie } from "../Services/movieService";
import { getGenres} from "../Services/genreService";

class NewMovie extends Form {
    state = {
        data : {
            title : '',
            genreId : '', 
            numberInStock : '', 
            dailyRentalRate : ''
        },
        errors : {},
        genres : []
        
    };
    schema = {
        _id : joi.string(),
        title : joi.string().required().label('Title'),
        genreId : joi.string().required().label("Genre"),
        numberInStock : joi.number().required().label('numberInStock').min(0).max(100), 
        dailyRentalRate : joi.number().required().label('dailyRentalRate').min(0).max(10)
    };
    
    async componentDidMount() {
      
        const {data} = await getGenres();
        this.setState({genres : data});
       // await this.populateMovie();
    }
    
    doSubmit = async () => {      
        console.log(this.state.data); 
       await saveMovie(this.state.data);
       this.props.history.push("/movie");

    };

    render() { 
        const {genres} = this.state;
      
        return (    
        <div>
            <h1>NewMovie</h1>
            <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect('genreId', genres, "Genre")}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate",)}
                    {this.renderButton('Save')}
            </form>
        </div>);

    }
}
 
export default NewMovie;