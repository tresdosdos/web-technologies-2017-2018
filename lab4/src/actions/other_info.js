import GitHubAPI from '../services/githubAPI';
import store from '../index';
import React from 'react';

export const getRepos = () => (dispatch) => {
    GitHubAPI.getOtherInfo(store.getState().userInfo.reposUrl).then(
        (res) => {
            const result = [];
            res.forEach((element) => {
                result.push(element.name)
            });
            const repos = result.map((element, step) =>{
                return <li key={step}>{element}</li>
            });
            dispatch({
                type: 'FETCH_REPOS_SUCCESS',
                repos: repos
            })
        }
    )
};

export const getFollowers = () => (dispatch) => {
    GitHubAPI.getOtherInfo(store.getState().userInfo.followersUrl).then(
        (res) => {
            const result = [];
            res.forEach((element) => {
                result.push(element.login)
            });
            const followers = result.map((element, step) =>{
                return <li key={step}>{element}</li>
            });
            dispatch({
                type: 'FETCH_FOLLOWERS_SUCCESS',
                followers: followers
            })
        }
    )
};

export const getOrganizations = () => (dispatch) => {
    GitHubAPI.getOtherInfo(store.getState().userInfo.organizationsUrl).then(
        (res) => {
            const result = [];
            res.forEach((element) => {
                result.push(element.login)
            });
            const organizations = result.map((element, step) =>{
                return <li key={step}>{element}</li>
            });
            dispatch({
                type: 'FETCH_ORGANIZATIONS_SUCCESS',
                organizations: organizations
            })
        }
    )
};