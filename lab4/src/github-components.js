import React, {Fragment} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faUsers, faLocationArrow, faLink} from '@fortawesome/fontawesome-free-solid'

function Link(props) {
    return (
        <a href={props.href} className={props.class}>{props.value}</a>
    );
}

function Pic(props) {
    return (
        <img src={props.src} alt={props.value} className={props.class}/>
    );
}

function Icon(props) {
    return (
        <FontAwesomeIcon icon={props.icon} className='userIcons'/>
    );
}

function TextNode(props) {
    if (props.type === 'h1'){
        return (
            <h1 className={props.class}>{props.value}</h1>
        );
    }
    else if (props.type === 'h2'){
        return (
            <h2 className={props.class}>{props.value}</h2>
        );
    }
    else if (props.type === 'h3'){
        return (
            <h3 className={props.class}>{props.value}</h3>
        );
    }
    else if (props.type === 'h4'){
        return (
            <Fragment>
                <Icon icon={props.icon}/>
                <h4 className={props.class}>{props.value}</h4>
            </Fragment>
        );
    }
    else if (props.type === 'p'){
        return (
            <Fragment>
                <Icon icon={props.icon}/>
                <p className={props.class}>{props.value}</p>
            </Fragment>
        );
    }
    else if (props.type === 'a'){
        return (
            <Fragment>
                <Icon icon={props.icon}/>
                <Link href={props.href} value={props.value} class='user_link'/>
            </Fragment>
        );
    }
    else if (props.type === 'img'){
        return (
            <Pic src={props.src} alt={props.alt} class='user_avatar'/>
        );
    }
    else{
        return (
            <h1>TextNode Error</h1>
        );
    }
}

function Inputs(props) {
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
            <TextNode type='h1'  value={props.defaultValue.userName} class='user_name'/>
            <TextNode type='h2' value={props.defaultValue.userLogin} class='user_login'/>
            <TextNode type='h3' value={props.defaultValue.userBio} class='user_bio'/>
            <TextNode type='p' icon={faUsers} value={props.defaultValue.userCompany} class='user_company'/>
            <TextNode type='h4' icon={faLocationArrow} value={props.defaultValue.userLocation} class='user_location'/>
            <TextNode type='a' icon={faLink} href={props.defaultValue.userSocial} value={props.defaultValue.userSocial}/>
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
                    <Inputs search={this.find} onKeyUp={this.keyEnter}/>
                    <h1>There is no login {this.state.errName}</h1>
                </div>);
        }
        if (this.state.isFetched === true) {
            return (
                <div className='userInfo'>
                    <Inputs search={this.find} onKeyUp={this.keyEnter}/>
                    <UserNode defaultValue={this.state.defaultValue}/>
                </div>
            );
        }
        else {
            return (
                <div className='userInfo'>
                    <Inputs search={this.find} onKeyUp={this.keyEnter} />
                </div>
            );
        }
    }
}

export default UserInfo;