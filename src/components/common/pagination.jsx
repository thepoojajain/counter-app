import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';



const Pagination = ({itemCounts, pageSize, onPageChange, currentPage}) => {
    
    const pageCount = Math.ceil(itemCounts / pageSize);
    const pages =_.range(1,pageCount+1);
    if(pageCount === 1 ) return null;
    return ( <nav>
    <ul className="pagination">
        {pages.map(page => (
             <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
            </li>)
            )
            }
    </ul> 
  </nav> ); 
}
 
Pagination.propTypes  = {
        itemCounts : PropTypes.number.isRequired,
        pageSize : PropTypes.number.isRequired,
        currentPage : PropTypes.number.isRequired,
         onPageChange : PropTypes.func.isRequired
    }
export default Pagination