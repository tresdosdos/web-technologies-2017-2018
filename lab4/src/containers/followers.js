import React, {Fragment} from 'react';
import {connect} from "react-redux";

class Followers extends React.Component{
    render(){
        if (this.props.store.otherInfo.followers.length !== 0){
            return (
                <Fragment>
                    {this.props.store.otherInfo.followers}.
                </Fragment>
            );
        }
        return <h2>No repositories</h2>;
    }
}

export default connect(
    state => ({store: state}),
)(Followers);