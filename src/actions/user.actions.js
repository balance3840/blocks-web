import { SET_NAME } from "../constants/user.constants";

/**
 * @param {string} name A string that will update the
 * name property on the redux-store
*/
export const setName = name => ({
    type: SET_NAME,
    payload: name
});