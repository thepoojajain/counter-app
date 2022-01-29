import React, { Component } from 'react';
import Form from './common/form';


const Search = ({name, onChange}) => {
    console.log()
    return (  
        <input className="form-control" 
        type="text" placeholder="Search..." onChange={e => onChange(e.currentTarget.value)}/>
    );
}
 
export default Search;