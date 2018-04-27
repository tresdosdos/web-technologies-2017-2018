import React from 'react';
import UserInfo from './github';
import {Link, Switch, Route} from 'react-router-dom'
import OtherInfo from './other';

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