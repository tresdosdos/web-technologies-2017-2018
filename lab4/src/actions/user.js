import GitHubAPI from '../GitHubAPI';

export const fetchSuccess = () => (dispatch) => {
    const text = document.getElementById('textInput');
    GitHubAPI.getUser(text.value).then( (result) =>{
    dispatch({
        type: 'FETCH_SUCCESS',
        data: {
            userImg: result.avatar_url,
            userName: result.name,
            userLogin: result.login,
            userBio: result.bio,
            userCompany: result.company,
            userLocation: result.location,
            userEmail: result.email,
            userSocial: result.blog,
            isError: false
        }
    })})
        .catch((err) => {
            if (err.message === 'FETCH_ERROR'){
                dispatch({
                    type: 'FETCH_ERROR',
                    isError: true,
                    errName: '404 NOT FOUND'
                });
            }
            else{
                dispatch({
                    type: 'SERVER_ERROR',
                    isError: true,
                    errName: 'There are some server errors'
                });
            }
        });
};

