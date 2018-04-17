import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import UserTabs from './components/tabs-components';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {HashRouter} from 'react-router-dom';
import MainInfo from './routes';


const store = createStore(reducers, applyMiddleware(thunk));




export default store;


ReactDOM.render(
    <Provider store={store}>
        <main className='mainContent'>
            <HashRouter>
                <MainInfo/>
            </HashRouter>
            <UserTabs/>
        </main>
    </Provider>,
    document.getElementById('root')
);