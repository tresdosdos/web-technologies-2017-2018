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

export function UserNode(props) {
    return (
        <div>
            <Pic src={props.defaultValue.userImg} alt='avatar' class='user_avatar'/>
            <h1 className='user_name'>{props.defaultValue.userName}</h1>
            <h2 className='user_login'>{props.defaultValue.userLogin}</h2>
            <h3 className='user_bio'>{props.defaultValue.userBio}</h3>
            <Icon icon={faUsers}/>
            <p className='user_company'>{props.defaultValue.userCompany}</p>
            <Icon icon={faLocationArrow}/>
            <h4 className='user_location'>{props.defaultValue.userLocation}</h4>
            <Icon icon={faLink}/>
            <Link href={props.defaultValue.userSocial} value={props.defaultValue.userSocial} class='user_link'/>
        </div>
    );
}