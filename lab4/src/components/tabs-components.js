import React from 'react';

function InfoTab(props){
    return (
        <textarea readOnly={props.readOnly} value={props.text} onChange={props.onChange}></textarea>
    );
}

export function EditableTab(props) {
    return (
        <div className='editableTab'>
            <button onClick={props.onClick} className='editButton'>{props.readOnly ? ('Edit') : ('Save changes')}</button>
            <InfoTab readOnly={props.readOnly} text={props.text[props.currentTab]} currentTab={props.currentTab} onChange={props.onChange}/>
        </div>
    );
}