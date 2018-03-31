import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const createElements = {
    h1: function (props) {
        return (
            <h1>{props.value}</h1>
        );
    },
    h2: function (props) {
        return (
            <h2>{props.value}</h2>
        );
    },
    h3: function (props) {
        return (
            <h3>{props.value}</h3>
        );
    },
    p: function (props) {
        return (
            <p>{props.value}</p>
        );
    },
    a: function (props) {
        return (
            <a href={props.link}>{props.value}</a>
        );
    },
    img: function (props) {
        return (
            <img src={props.src} alt={props.value}/>
        );
    }
};

function Icon(props) {
    return (
        <img src={props.icon} alt={props.alt} />
    );
}

function TextNode(props) {
    if (createElements[props.type])
    {
        const TextTag = createElements[props.type];
        return (
            <Fragment>
                <i className={props.ic}/>
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
            <TextNode type='h1' ic='fa-fa-car' value={props.defaultValue.userName}/>
            <TextNode type='h2' value={props.defaultValue.userLogin}/>
            <TextNode type='h3' value={props.defaultValue.userBio}/>
            <TextNode type='p' value={props.defaultValue.userCompany}/>
            <TextNode type='p' value={props.defaultValue.userLocation}/>
            <TextNode type='a' value={props.defaultValue.userEmail} link='#'/>
            <TextNode type='a' value={props.defaultValue.userSocial} link='#'/>
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
        console.log(this.state);
        let text = document.getElementById('textInput');
        fetch('https://api.github.com/users/' + text.value).then(
            (responseText) => {
                if (responseText.status >=400) {
                    this.setState({
                        isFetched: true
                    });
                    console.log("Error. Status code:" + responseText.status);
                    this.setState({isError: true, errName:text.value});
                    console.log(this.state);
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
        console.log('lul');
        if (e.keyCode === 13)
            this.find();
    }
    render(){
        if (this.state.isError === true){
            return (
                <Fragment>
                    <Inputer search={this.find} onKeyUp={this.keyEnter}/>
                    <h1>There is no login {this.state.errName}</h1>
                </Fragment>);
        }
        if (this.state.isFetched === true) {
            return (
                <Fragment>
                    <Inputer search={this.find} onKeyUp={this.keyEnter}/>
                    <Icon className='fa-fa-car'/>
                    <UserNode defaultValue={this.state.defaultValue}/>
                </Fragment>
            );
        }
        else {
            return (
                <Inputer search={this.find} onKeyUp={this.keyEnter}/>
            );
        }
    }
}

ReactDOM.render(
    <UserInfo/>,
    document.getElementById('root')
);