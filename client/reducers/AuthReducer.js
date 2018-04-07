import {
  AUTHENTICATION_ERROR,
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER
} from "../actions/authentication";

export default (
  state = { authenticated: null, user: null, error: [] },
  action
) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, authenticated: true, user: action.payload, error: [] };
    case UNAUTHENTICATE_USER:
      return { ...state, authenticated: false, user: null, error: [] };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
