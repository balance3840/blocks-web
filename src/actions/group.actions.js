import { GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_FAILURE } from "../constants/group.constants";

export const getGroups = () => ({
    type: GET_GROUPS
});

export const getGroupsSuccess = groups => ({
    type: GET_GROUPS_SUCCESS,
    payload: groups
});

export const getGroupsFailure = error => ({
    type: GET_GROUPS_FAILURE,
    payload: error
});