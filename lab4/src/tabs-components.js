import React from 'react';

function InfoTab(props){
    return (
        <textarea readOnly={props.readOnly} value={props.tabText[props.currentTab]} onChange={props.onChange}></textarea>
    );
}

function EditableTab(props) {
    let buttonValue = '';
    if (props.value === true)
    {
        buttonValue = 'Edit';
    }
    else{
        buttonValue = 'Save changes';
    }
    return (
        <div className='editableTab'>
            <button onClick={props.onClick} className='editButton'>{buttonValue}</button>
            <InfoTab readOnly={props.readOnly} tabText={props.tabText} currentTab={props.currentTab} onChange={props.onChange}/>
        </div>
    );
}

class UserTabs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notEditable: true,
            tabText:{
                1: '',
                2: '',
                3: ''
            },
            currentTab: 1
        };
        this.editTab = this.editTab.bind(this);
        this.changeTabState = this.changeTabState.bind(this);
        this.setText = this.setText.bind(this);
    }
    editTab(e){
        const button = e.target.value;
        if (button === 'main')
            this.setState({
                currentTab: 1
            });
        else if (button === 'education')
            this.setState({
                currentTab: 2
            });
        else
            this.setState({
                currentTab: 3
            });
    }
    changeTabState(){
        this.setState({
            notEditable: !this.state.notEditable
        });
    }
    setText(e){
        let tab = this.state.currentTab;
        if (tab === 1)
            this.setState({
                tabText:{
                    1 : e.target.value,
                    2: this.state.tabText["2"],
                    3: this.state.tabText["3"]
                }
            });
        else if (tab === 2)
            this.setState({
                tabText:{
                    1 : this.state.tabText["1"],
                    2: e.target.value,
                    3: this.state.tabText["3"]
                }
            });
        else
            this.setState({
                tabText:{
                    1 : this.state.tabText["1"],
                    2: this.state.tabText["2"],
                    3: e.target.value
                }
            });
    }
    render(){
        return (
            <div>
                <ul className='ulTabButtons'>
                    <li className='tabButton'>
                        <input type='radio' value='main' className='radioTabButton' name='tabRadio' id='radioTab1' onClick={this.editTab} defaultChecked='true'/>
                        <label className='radioLabel' htmlFor='radioTab1'>Основное</label>
                    </li>
                    <li className='tabButton'>
                        <input type='radio' value='education' className='radioTabButton' name='tabRadio' id='radioTab2' onClick={this.editTab}/>
                        <label className='radioLabel' htmlFor='radioTab2'>Образование</label>
                    </li>
                    <li className='tabButton'>
                        <input type='radio' value='contacts' className='radioTabButton' name='tabRadio' id='radioTab3' onClick={this.editTab}/>
                        <label className='radioLabel' htmlFor='radioTab3'>Контакты</label>
                    </li>
                </ul>
                <EditableTab readOnly={this.state.notEditable} onClick={this.changeTabState} value={this.state.notEditable} tabText={this.state.tabText} currentTab={this.state.currentTab} onChange={this.setText}/>
            </div>
        );
    }
}

export default UserTabs;