export const getUser = () => {
    return {
        type: 'GET_USER'
    }
};

export const getRepos = () => {
    return {
        type: "GET_REPOS"
    }
};

export const getOrganizations = () => {
    return {
        type: "GET_ORGANIZATIONS"
    }
};

export const getFollowers = () => {
    return {
        type: "GET_FOLLOWERS"
    }
};

export const getSearchRepo = () => {
    return {
        type: "SEARCH_REPO"
    }
};