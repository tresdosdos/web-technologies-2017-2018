import React, {Fragment} from 'react';
import {connect} from "react-redux";

class TopRepos extends React.Component{
    render(){
        if (this.props.store.otherInfo.topRepos.length !== 0){
            return (
                <Fragment>
                    <h2>Top starred repos on github:</h2>
                    {this.props.store.otherInfo.topRepos.map((element, step) => {
                        return <li key={step}>{element}</li>
                    })}
                </Fragment>
            );
        }
        return <h2>No top repos</h2>;
    }
}

export default connect(
    state => ({store: state}),
)(TopRepos);