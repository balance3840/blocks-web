import { SET_NAME, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from "../constants/user.constants";

const initialState = {
  id: null,
  name: "",
  lastname: "",
  email: "",
  email_verified_at: null,
  role_id: null,
  institute_id: null,
  created_at: null,
  updated_at: null,
  token: "",
  token_type: "",
  loading: false,
  error: false,
};

/**
 * Main function in charge of updating the state on the redux-store
 *
 * @param {object} state Contains the properties needed to be updated
 * @param {object} action Sets what should be updated on the state
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return { ...state };
  }
};

export default userReducer;
