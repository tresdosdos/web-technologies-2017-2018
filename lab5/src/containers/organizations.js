import React, {Fragment} from 'react';
import {connect} from "react-redux";

class Organizations extends React.Component{
    render(){
        if (this.props.store.otherInfo.organizations.length !== 0){
            return (
                <Fragment>
                    <h2>{this.props.store.userInfo.userName} organizations:</h2>
                    {this.props.store.otherInfo.organizations.map((element, step) => {
                        return <li key={step} className='user__items'>{element}</li>
                    })}
                </Fragment>
            );
        }
        return <h2>No organizations</h2>;
    }
}

export default connect(
    state => ({store: state}),
)(Organizations);