import React, {Fragment} from 'react';
import {connect} from "react-redux";
import Filter from '../components/filter';

class Repos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter: 0
        }
    }
    firstFilter = () => {
        this.setState({
            filter: 1
        });
    };
    secondFilter = () => {
        this.setState({
            filter: 2
        });
    };
    cancelFilter = () => {
        this.setState({
            filter: 0
        })
    };
    filterCheck = (filter, data) => {
        switch (filter){
            case 0: {
                return data;
            }
            case 1: {
                const temp = data.slice(0);
                return temp.sort();

            }
            case 2: {
                const temp = data.slice(0);
                return temp.reverse();
            }
        }
    };
    render(){
        if (this.props.store.otherInfo.repos.length !== 0){
            this.data = this.filterCheck(this.state.filter, this.props.store.otherInfo.repos);
            return (
                <Fragment>
                    <Filter firstFilter={this.firstFilter} secondFilter={this.secondFilter} cancelFilter={this.cancelFilter}/>
                    <h2>{this.props.store.userInfo.userName} repos:</h2>
                    {this.data.map((element, step) => {
                            return <li key={step} className='user__items'>{element}</li>
                    })}
                </Fragment>
            );
        }
        return <h2>No repositories</h2>
    }
}

export default connect(
    state => ({store: state}),
)(Repos);