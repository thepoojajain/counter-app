import { object } from 'prop-types';
import React, { Component } from 'react';


const Select = ({label,name,dropDownList,error,...rest}) => {
    return ( <div>
        <label htmlFor={name}>{label}</label>
        <select 
        {...rest}
        name={name} 
        id={name} 
        className="form-control" >
        <option value=""/>
        {dropDownList.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>);
}
 
export default Select;