import { GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_FAILURE } from "../constants/group.constants";

const initialState = {
  groups: [],
  loading: false,
  error: false,
};

/**
 * Main function in charge of updating the state on the redux-store
 *
 * @param {object} state Contains the properties needed to be updated
 * @param {object} action Sets what should be updated on the state
 */
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        loading: true,
        error: false
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        loading: false,
        error: false
      };
    case GET_GROUPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return { ...state };
  }
};

export default groupReducer;
