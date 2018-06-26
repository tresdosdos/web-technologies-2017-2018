import requestAPI from './requestAPI';

const gitUrlApi = 'https://api.github.com/users/';
const gitRepoApi = 'https://api.github.com/search/repositories?q=';
const gitTopRepos = 'https://api.github.com/legacy/repos/search/:keyword?sort=stars';


function apiCall (url) {
    return requestAPI.get(url)
        .then((response) => {
            if (response.status >= 200 && response.status < 400) {
                return response.json()
            }
            if (response.status === 404) {
                throw new Error('GET_ERROR');
            }
            throw new Error('SERVER_ERROR');
        })
}

function getUser (login) {
    const url = gitUrlApi+login;
    return apiCall(url).then((res) => {
        return res;
    })
}

function getOtherInfo(url) {
    return apiCall(url).then((res) => {
        return res;
    })
}

function getRepo(name) {
    const url = gitRepoApi+name;
    return apiCall(url).then((res) =>{
        return res;
    });
}

function topRepos() {
    const url = gitTopRepos;
    return apiCall(url).then((res) => {
        return res;
    });
}

const GitHubAPI = {
    getUser,
    getOtherInfo,
    getRepo,
    topRepos
};

export default GitHubAPI;