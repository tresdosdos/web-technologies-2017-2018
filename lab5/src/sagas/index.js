import { call, put, takeEvery } from 'redux-saga/effects';
import githubAPI from '../services/githubAPI';
import { fetchSuccess } from "../actions/user";
import { fetchReposSuccess, fetchOrganizationsSuccess, fetchFollowersSuccess, searchRepoSuccess } from "../actions/otherInfo";
import store from '../index';

function getUserData(login) {
    return githubAPI.getUser(login)
        .then((result) => {
            return {
                userImg: result.avatar_url,
                    userName: result.name,
                    userLogin: result.login,
                    userBio: result.bio,
                    userCompany: result.company,
                    userLocation: result.location,
                    userEmail: result.email,
                    userSocial: result.blog,
                    isError: false,
                    followersUrl: result.followers_url,
                    reposUrl: result.repos_url,
                    organizationsUrl: result.organizations_url
            }
        })
}

function *fetchUser() {
    const text = document.getElementById('textInput').value;
    try {
        const data = yield call(() => getUserData(text));
        yield put(fetchSuccess(data))
    } catch (e) {
        yield put({type: 'GET_ERROR', isError: true, errName: 'no such user'})
    }
}

function *fetchRepos() {
    const reposUrl = store.getState().userInfo.reposUrl;
    try {
        const data = yield call(() => githubAPI.getOtherInfo(reposUrl));
        const repos = data.map((repo) => repo.name);
        yield put(fetchReposSuccess(repos))
    } catch (e) {
        console.log(e);
    }
}

function *fetchOrgs() {
    const orgsUrl = store.getState().userInfo.organizationsUrl;
    try {
        const data = yield call(() => githubAPI.getOtherInfo(orgsUrl));
        const orgs = data.map((org) => org.login);
        yield put(fetchOrganizationsSuccess(orgs))
    } catch (e) {
        console.log(e);
    }
}

function *fetchFollowers() {
    const followersUrl = store.getState().userInfo.followersUrl;
    try {
        const data = yield call(() => githubAPI.getOtherInfo(followersUrl));
        const followers = data.map((follower) => follower.login);
        yield put(fetchFollowersSuccess(followers))
    } catch (e) {
        console.log(e);
    }
}

function *searchRepo() {
    const repoName = document.getElementById('repoSearch').value;
    try {
        const data = yield call(() => githubAPI.getRepo(repoName));
        const repos = data.items.map((repo) => repo.name);
        yield put(searchRepoSuccess(repos))
    } catch (e) {
        console.log(e);
    }
}


export default function* sagasWatcher() {
    yield takeEvery("GET_USER", fetchUser);
    yield takeEvery("GET_REPOS", fetchRepos);
    yield takeEvery("GET_ORGANIZATIONS", fetchOrgs);
    yield takeEvery("GET_FOLLOWERS", fetchFollowers);
    yield takeEvery("SEARCH_REPO", searchRepo);
}