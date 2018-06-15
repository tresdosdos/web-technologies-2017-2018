import {changeTab, editTab, setContent} from "../actions/tabs";
import {connect} from "react-redux";
import React from "react";
import {EditableTab} from '../components/tabComponent'
import {Link, Switch, Route, withRouter} from 'react-router-dom';
import Followers from './followers';
import Repos from './repos';
import Organizations from './organizations';
import RepoSearch from './repoSearch';
import TopRepos from './topRepos';
import {getRepos, getOrganizations, getTopRepos, getFollowers} from "../actions/sagasActions";

function RouteLinks(props) {
    return (
        <ul className='ulTabButtons'>
            <li className='tabButton'>
                <Link name='1' onClick={props.changeTab} className='radioTabButton' to='/'>Main</Link>
            </li>
            <li className='tabButton'>
                <Link name='2' onClick={props.changeTab} className='radioTabButton' to='/'>Education</Link>
            </li>
            <li className='tabButton'>
                <Link className='radioTabButton' to='/followers' onClick={props.getFollowers}>Followers</Link>
            </li>
            <li className='tabButton'>
                <Link className='radioTabButton' to='/repos' onClick={props.getRepos}>Repositories</Link>
            </li>
            <li className='tabButton'>
                <Link className='radioTabButton' to='/organizations' onClick={props.getOrganizations}>Organizations</Link>
            </li>
            <li className='tabButton'>
                <Link className='radioTabButton' to='/reposearch' onClick={props.getOrganizations}>Search</Link>
            </li>
            <li className='tabButton'>
                <Link className='radioTabButton' to='/toprepos' onClick={props.getTopRepos}>Top</Link>
            </li>
        </ul>
    );
}

class UserTabs extends React.Component{
    render(){
        return (
            <div className='tab_container'>
                <nav>
                    <RouteLinks changeTab={this.props.changeTab} getFollowers={this.props.getFollowers} getRepos={this.props.getRepos} getOrganizations={this.props.getOrganizations} getTopRepos={this.props.getTopRepos}/>
                </nav>
                <Switch>
                    <Route exact path='/' render={() => <EditableTab readOnly={this.props.store.tabs.notEditable} onClick={this.props.editTab}
                                 text={this.props.store.tabs} currentTab={this.props.store.tabs.currentTab} onChange={this.props.setContent}/>}/>
                    <Route path='/followers' component={Followers}/>
                    <Route path='/repos' component={Repos}/>
                    <Route path='/organizations' component={Organizations}/>
                    <Route path='/reposearch' component={RepoSearch}/>
                    <Route path='/toprepos' component={TopRepos}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(
    state => ({store: state}),
    dispatch => ({
        changeTab: (e) => dispatch(changeTab(e)),
        editTab: (e) => dispatch(editTab(e)),
        getTopRepos: () => {dispatch(getTopRepos())},
        setContent: (e) =>dispatch(setContent(e)),
        getRepos: () => {dispatch(getRepos())},
        getFollowers: () => {dispatch(getFollowers())},
        getOrganizations: () => {dispatch(getOrganizations())}
    })
)(UserTabs));