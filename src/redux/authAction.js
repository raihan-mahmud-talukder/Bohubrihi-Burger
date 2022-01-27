import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }
    let authURL = null;
    if (mode === 'Sign Up') {
        authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    } else {
        authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    }
    const API_KEY = 'AIzaSyCczuq7zrrQ3QoxwTdfMClIoIT6kD2TWsU';
    axios.post(authURL + API_KEY, authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
}