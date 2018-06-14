import {combineReducers} from 'redux';
import userInfo from './userInfo';
import tabs from './tabs';
import getOtherInfo from './otherInfo'

export default combineReducers({
    userInfo: userInfo,
    tabs: tabs,
    otherInfo: getOtherInfo
});