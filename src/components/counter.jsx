import react from 'react';
import React, { Component } from 'react';


class Counter extends React.Component {
    state ={
        tags : []
    };

    renderTags(){
        if(this.state.tags.length === 0 ) return <p>There are no tags</p>;
        return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
    }

    
    render() {        
      return (
          <div>
            <div className="row">
              <div className="col col-1">
                <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
              </div>
              <div className="col">
                <button onClick={() =>this.props.onIncrement(this.props.counter)}
                 className="btn btn-secondary btn-sm m-2">+</button>
                <button onClick={() => this.props.OnDecrement(this.props.counter)} disabled={this.props.counter.value === 0 ? 'disabled' : ""}
                 className="btn btn-secondary btn-sm m-2">-</button>
                <button onClick={() => this.props.onDelete(this.props.counter.id)} 
                 className="btn btn-danger btn-sm">Delete</button>
             </div>
            {this.state.tags.length === 0 && 'Please create a new tag'}
            {this.renderTags()}</div>   
        </div>

        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount(){
        const { value } = this.props.counter;
        return value === 0 ? "zero" : value;
    }
}
 
export default Counter;