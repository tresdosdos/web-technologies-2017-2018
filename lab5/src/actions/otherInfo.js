export const fetchReposSuccess = (data) => {
        return {
            type: "FETCH_REPOS_SUCCESS",
            repos: data
        }
};

export const fetchOrganizationsSuccess = (data) => {
    return {
        type: "FETCH_ORGANIZATIONS_SUCCESS",
        organizations: data
    }
};

export const fetchFollowersSuccess = (data) => {
    return {
        type: "FETCH_FOLLOWERS_SUCCESS",
        followers: data
    }
};

export const searchRepoSuccess = (data) => {
    return {
        type: "SEARCH_REPO_SUCCESS",
        repoSearch: data
    }
};

export const topReposSuccess = (data) => {
    return {
        type: "TOP_REPOS_SUCCESS",
        topRepos: data
    }
};