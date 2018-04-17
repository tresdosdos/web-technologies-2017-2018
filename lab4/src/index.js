import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import UserInfo from './github-components';
import UserTabs from './tabs-components';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() => {
    console.log(store.getState());
});

export default store;

function GithubApp() {
    return (
        <main className='mainContent'>
            <UserInfo/>
            <UserTabs/>
        </main>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <GithubApp/>
    </Provider>,
    document.getElementById('root')
);