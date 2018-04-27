import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {getRepos, getFollowers, getOrganizations} from "../actions/other_info";


class OtherInfo extends React.Component{
    render() {
        return (<Fragment>
            <h2 onClick={this.props.getFollowers}>Followers</h2>
            <div>
                {this.props.store.otherInfo.followers}
            </div>
            <h2 onClick={this.props.getRepos}>Repositories</h2>
            <div>
                {this.props.store.otherInfo.repos}
            </div>
            <h2 onClick={this.props.getOrganizations}>Organizations</h2>
            <div>
                {this.props.store.otherInfo.organizations}
            </div>
        </Fragment>);
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        getRepos: () => {dispatch(getRepos())},
        getFollowers: () => {dispatch(getFollowers())},
        getOrganizations: () => {dispatch(getOrganizations())}
    })
)(OtherInfo);