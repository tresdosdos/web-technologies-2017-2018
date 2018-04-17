import React from 'react';
import {changeTab, editTab, setContent} from './actions/tabs'
import {connect} from 'react-redux';


function InfoTab(props){
    return (
        <textarea readOnly={props.readOnly} value={props.text} onChange={props.onChange}></textarea>
    );
}

function EditableTab(props) {
    let buttonValue = '';
    let tabValue;
    if (props.readOnly === true)
    {
        buttonValue = 'Edit';
    }
    else{
        buttonValue = 'Save changes';
    }
    if (props.currentTab === 1){
        tabValue = props.text[1];
    }
    else if (props.currentTab === 2){
        tabValue = props.text[2];
    }
    else{
        tabValue = props.text[3];
    }
    return (
        <div className='editableTab'>
            <button onClick={props.onClick} className='editButton'>{buttonValue}</button>
            <InfoTab readOnly={props.readOnly} text={tabValue} currentTab={props.currentTab} onChange={props.onChange}/>
        </div>
    );
}

class UserTabs extends React.Component{
    render(){
        return (
            <div>
                <ul className='ulTabButtons'>
                    <li className='tabButton'>
                        <input type='radio' value='main' className='radioTabButton' name='tabRadio' id='radioTab1' onClick={this.props.changeTab} defaultChecked='true'/>
                        <label className='radioLabel' htmlFor='radioTab1'>Основное</label>
                    </li>
                    <li className='tabButton'>
                        <input type='radio' value='education' className='radioTabButton' name='tabRadio' id='radioTab2' onClick={this.props.changeTab}/>
                        <label className='radioLabel' htmlFor='radioTab2'>Образование</label>
                    </li>
                    <li className='tabButton'>
                        <input type='radio' value='contacts' className='radioTabButton' name='tabRadio' id='radioTab3' onClick={this.props.changeTab}/>
                        <label className='radioLabel' htmlFor='radioTab3'>Контакты</label>
                    </li>
                </ul>
                <EditableTab readOnly={this.props.store.tabs.notEditable} onClick={this.props.editTab} text={this.props.store.tabs} currentTab={this.props.store.tabs.currentTab} onChange={this.props.setContent}/>
            </div>
        );
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        changeTab: (e) => dispatch(changeTab(e)),
        editTab: (e) => dispatch(editTab(e)),
        setContent: (e) =>dispatch(setContent(e))
    })
)(UserTabs);