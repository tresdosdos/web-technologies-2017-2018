import {combineReducers} from 'redux';
import userInfo from './user_info';
import tabs from './tabs';

export default combineReducers({
    userInfo: userInfo,
    tabs: tabs
});