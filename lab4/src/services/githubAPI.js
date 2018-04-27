import requestAPI from './requestAPI';

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
    let url = `https://api.github.com/users/${login}`;
    return apiCall(url).then((res) => {
        return res;
    })
}

function getOtherInfo(url) {
    return apiCall(url).then((res) => {
        return res;
    })
}

const GitHubAPI = {
    getUser,
    getOtherInfo
};

export default GitHubAPI;