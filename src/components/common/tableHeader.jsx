import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons'

class TableHeader extends React.Component {
    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path === path) 
        sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'; 
        else { sortColumn.path = path;
            sortColumn.onSort= 'asc';
        }
        
        this.props.onSort(sortColumn);
    };

    renderSortIcon = column => {
        const {sortColumn} = this.props;
        if(column.path !== sortColumn.path) return null;
        if(sortColumn.order === 'asc') return <FontAwesomeIcon icon={faSortAsc} />;
        return <FontAwesomeIcon icon={faSortDesc} />;
    };

    render() { 
        const {columns, sortColumn, onSort} = this.props;
        return <thead>
            <tr>
                {columns.map(column =>
                <th onClick={() => this.raiseSort(column.path)}
                className='clickable' 
                key={column.path || column.key}>{column.label}{this.renderSortIcon(column)}</th>)}
                
            </tr>
        </thead>
    }
}
 
export default TableHeader;