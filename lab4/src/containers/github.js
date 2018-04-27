import React from 'react';
import {fetchSuccess} from "../actions/user";
import {connect} from "react-redux";
import {Inputs, UserNode} from "../components/github-components";

class UserInfo extends React.Component{
    keyEnter = (e) =>{
        if (e.keyCode === 13)
            this.props.fetchSuccess();
    };
    render(){
        if (this.props.store.userInfo.isError){
            return (<div className='userInfo'>
                <Inputs search={this.props.fetchSuccess} onKeyUp={this.keyEnter}/>
                {this.props.store.userInfo.errName ? (
                    <h1>{this.props.store.userInfo.errName}</h1>) : (
                    null
                )}
            </div>);
        }
        else {
            return (
                <div className='userInfo'>
                    <Inputs search={this.props.fetchSuccess} onKeyUp={this.keyEnter}/>
                    {this.props.store.userInfo.userLogin ? (
                        <UserNode defaultValue={this.props.store.userInfo}/>
                    ): null}
                </div>);
        }
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        fetchSuccess: () => {dispatch(fetchSuccess())}
    })
)(UserInfo);