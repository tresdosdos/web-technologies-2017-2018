import React, {Component} from 'react';

export default class Filter extends Component{
    render(){
        return (
            <div>
                <button onClick={this.props.firstFilter}>From A to Z</button>
                <button onClick={this.props.secondFilter}>From Z to A</button>
                <button onClick={this.props.cancelFilter}>Cancel Filter</button>
            </div>
        );
    }
}