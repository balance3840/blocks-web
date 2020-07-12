import { SET_NAME } from "../constants/user.constants";

const initialState = {
  name: 'rENSY',
  lastname: ''
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
        name: action.payload
      };
    default:
      return { ...state };
  }
};

export default userReducer;