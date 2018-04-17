import React from 'react';
import UserInfo from '../components/github-components';
import {Link, Switch, Route} from 'react-router-dom'
import OtherInfo from '../components/other_component';

export default class InfoApp extends React.Component{
    render() {
        return (
            <div className='main_info'>
                <nav>
                    <Link to='/' className='route_link'>User info</Link>
                    <Link to='/other' className='route_link'>Other</Link>
                </nav>
                <Switch>
                    <Route exact path='/' component={UserInfo}/>
                    <Route path='/other' component={OtherInfo}/>
                </Switch>
            </div>
        );
    }
}