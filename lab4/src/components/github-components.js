import React, {Fragment} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faUsers, faLocationArrow, faLink} from '@fortawesome/fontawesome-free-solid';

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
    if (props.value !== null && props.value !== ''){
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
    }
        return null;
}

export function Inputs(props) {
    return (
        <Fragment>
            <input type='text' id='textInput' onKeyUp={props.onKeyUp}/>
            <button onClick={props.search}>Find!</button>
        </Fragment>
    );
}

export function UserNode(props) {
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

