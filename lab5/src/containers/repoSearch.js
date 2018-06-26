import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {getSearchRepo} from "../actions/sagasActions";

class RepoSearch extends React.Component{
    keyEnter = (e) =>{
        if (e.keyCode === 13) {
            this.props.getSearchRepo();
        }
    };
    render(){
        return (
            <Fragment>
                <input type='text' id='repoSearch' onKeyUp={this.keyEnter}/>
                {this.props.store.otherInfo.repoSearch.map((element, step) => {
                    return <li key={step}>{element}</li>
                })}
            </Fragment>
        );
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        getSearchRepo: () => dispatch(getSearchRepo())
    })
)(RepoSearch);