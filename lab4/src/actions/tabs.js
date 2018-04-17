import store from '../index';

function changeTab(e) {
    let number;
    if (e.target.id === 'radioTab1'){
        number = 1;
    }
    else if (e.target.id === 'radioTab2'){
        number = 2;
    }
    else{
        number = 3;
    }
    return {
        type: 'CHANGE_TAB',
        currentTab: number
    }
}

function editTab() {
    return {
        type: 'EDIT_TAB'
    }
}

function setContent(e) {
    return {
        type: 'SET_CONTENT',
        currentTab: store.getState().tabs.currentTab,
        text: e.target.value
    }
}

export {changeTab, editTab, setContent};