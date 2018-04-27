import React from 'react';

function InfoTab(props){
    return (
        <textarea readOnly={props.readOnly} value={props.text} onChange={props.onChange}></textarea>
    );
}

export function EditableTab(props) {
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