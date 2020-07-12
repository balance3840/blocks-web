import { SET_NAME, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/user.constants";

export const setName = name => ({
    type: SET_NAME,
    payload: name
});

export const login = () => ({
    type: LOGIN
});

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: error
});