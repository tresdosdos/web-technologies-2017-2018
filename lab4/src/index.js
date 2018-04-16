import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import UserInfo from './github-components';
import UserTabs from './tabs-components';

function GithubApp() {
    return (
        <main className='mainContent'>
            <UserInfo/>
            <UserTabs/>
        </main>
    );
}

ReactDOM.render(
    <GithubApp/>,
    document.getElementById('root')
);