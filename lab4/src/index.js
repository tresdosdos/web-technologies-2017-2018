import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faUsers, faLocationArrow, faEnvelope, faLink} from '@fortawesome/fontawesome-free-solid'


const createElements = {
    h1: function (props) {
        return (
            <h1 className='userName'>{props.value}</h1>
        );
    },
    h2: function (props) {
        return (
            <h2 className='userLogin'>{props.value}</h2>
        );
    },
    h3: function (props) {
        return (
            <h3 className='userBio'>{props.value}</h3>
        );
    },
    h4: function (props) {
        return (
            <h4 className='userLocation'>{props.value}</h4>
        );
    },
    p: function (props) {
        return (
            <p className='userCompany'>{props.value}</p>
        );
    },
    a: function (props) {
        return (
            <a href={props.link} className='userLink'>{props.value}</a>
        );
    },
    img: function (props) {
        return (
            <img src={props.src} alt={props.value} className='userAvatar' />
        );
    }
};

function Icon(props) {
    return (
        <FontAwesomeIcon icon={props.icon} className='userIcons'/>
    );
}

function TextNode(props) {
    if (createElements[props.type])
    {
        const TextTag = createElements[props.type];
        if (props.value === null || props.value === '' || props.icon === undefined)
            return (<TextTag link={props.link} value={props.value} src={props.src}/>);
        return (
            <Fragment>
                <Icon icon={props.icon}/>
                <TextTag link={props.link} value={props.value} src={props.src}/>
            </Fragment>
        );
    }
    else return <h1>Error</h1>;
}

function Inputer(props) {
    return (
        <Fragment>
            <input type='text' id='textInput' onKeyUp={props.onKeyUp}/>
            <button onClick={props.search}>Find!</button>
        </Fragment>
    );
}

function UserNode(props) {
    return (
        <div>
            <TextNode type='img' src={props.defaultValue.userImg} alt='avatar'/>
            <TextNode type='h1'  value={props.defaultValue.userName}/>
            <TextNode type='h2' value={props.defaultValue.userLogin}/>
            <TextNode type='h3' value={props.defaultValue.userBio}/>
            <TextNode type='p' icon={faUsers} value={props.defaultValue.userCompany}/>
            <TextNode type='h4' icon={faLocationArrow} value={props.defaultValue.userLocation}/>
            <TextNode type='a' icon={faEnvelope} value={props.defaultValue.userEmail} link={props.defaultValue.userEmail}/>
            <TextNode type='a' icon={faLink} value={props.defaultValue.userSocial} link={props.defaultValue.userSocial}/>
        </div>
    );
}

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isError: false,
            errName: '',
            isFetched: false,
            defaultValue : {
                userImg: '',
                userName: '',
                userLogin: '',
                userBio: '',
                userCompany: '',
                userLocation: '',
                userEmail: '',
                userSocial: ''
            }
        };
        this.find = this.find.bind(this);
        this.addInfo = this.addInfo.bind(this);
        this.keyEnter = this.keyEnter.bind(this);
    }
    addInfo(result){
        this.setState({
            isError: false,
            errName: '',
            defaultValue: {
                userImg: result.avatar_url,
                userName: result.name,
                userLogin: result.login,
                userBio: result.bio,
                userCompany: result.company,
                userLocation: result.location,
                userEmail: result.email,
                userSocial: result.blog
            }
        });
    }
    find(){
        let text = document.getElementById('textInput');
        fetch('https://api.github.com/users/' + text.value).then(
            (responseText) => {
                if (responseText.status >=400) {
                    this.setState({
                        isFetched: true
                    });
                    console.log("Error. Status code:" + responseText.status);
                    this.setState({isError: true, errName:text.value});
                    return;
                }
                return responseText.json();
            }
        ).then((result) => {
            this.addInfo(result);
            this.setState({
                isFetched: true
            });
        })
            .catch(function (err) {
                console.log("There are some fetch error:" + err);
            });
    }
    keyEnter(e){
        if (e.keyCode === 13)
            this.find();
    }
    render(){
        if (this.state.isError === true){
            return (
                <div className='userInfo'>
                    <Inputer search={this.find} onKeyUp={this.keyEnter}/>
                    <h1>There is no login {this.state.errName}</h1>
                </div>);
        }
        if (this.state.isFetched === true) {
            return (
                <div className='userInfo'>
                    <Inputer search={this.find} onKeyUp={this.keyEnter}/>
                    <UserNode defaultValue={this.state.defaultValue}/>
                </div>
            );
        }
        else {
            return (
                <div className='userInfo'>
                    <Inputer search={this.find} onKeyUp={this.keyEnter} />
                </div>
            );
        }
    }
}

function InfoTab(props){
    return (
        <textarea readOnly={props.readOnly} value={props.tabText[props.currentTab]} onChange={props.onChange}></textarea>
    );
}

function EditableTab(props) {
    return (
        <div className='editableTab'>
            <button onClick={props.onClick} className='editButton'>{props.value}</button>
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
        let buttonValue = '';
        if (this.state.notEditable === true)
            buttonValue = 'Edit';
        else
            buttonValue = 'Save changes';
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
                <EditableTab readOnly={this.state.notEditable} onClick={this.changeTabState} value={buttonValue} tabText={this.state.tabText} currentTab={this.state.currentTab} onChange={this.setText}/>
            </div>
        );
    }
}

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