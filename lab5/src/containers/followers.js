import React, {Fragment} from 'react';
import {connect} from "react-redux";

class Followers extends React.Component{
    render(){
        if (this.props.store.otherInfo.followers.length !== 0){
            return (
                <Fragment>
                    <h2>{this.props.store.userInfo.userName} followers:</h2>
                    {this.props.store.otherInfo.followers.map((element, step) => {
                        return <li key={step} className='user__items'>{element}</li>
                    })}
                </Fragment>
            );
        }
        return <h2>No repositories</h2>;
    }
}

export default connect(
    state => ({store: state}),
)(Followers);