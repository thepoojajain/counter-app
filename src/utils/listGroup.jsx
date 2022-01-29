import React, { Component } from 'react';

const ListGroup = props => {
   const {items, textProperty, valueProperty, onItemSelect, selectedItem} = props;
      return <ul className="list-group">
               {items.map(genre => (
               <li onClick={() => onItemSelect(genre)} 
               className={ genre === selectedItem ? "list-group-item active" : "list-group-item" }
               key={genre[valueProperty]}>
               {genre[textProperty]}</li>))}
         </ul>
}
 
ListGroup.defaultProps = {
   textProperty : "name",
   valueProperty : "_id"
};
export default ListGroup;