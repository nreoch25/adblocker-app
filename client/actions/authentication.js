import axios from "axios";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const UNAUTHENTICATE_USER = "UNAUTHENTICATE_USER";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export function loginUser({ email, password }, history) {
  return dispatch => {
    axios
      .post("/auth/login", { email, password })
      .then(response => {
        console.log("Successful Login", response.data.user);

        dispatch({
          type: AUTHENTICATE_USER,
          payload: response.data.user
        });
        history.push("/inventory");
      })
      .catch(error => {
        console.log("Failed Login", error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  };
}

export function currentUser() {
  return dispatch => {
    axios.post("/auth/user").then(response => {
      const user = response.data.user;
      if (user) {
        console.log("USER - authentication actions", user);
        dispatch({
          type: AUTHENTICATE_USER,
          payload: user
        });
      } else {
        dispatch({
          type: UNAUTHENTICATE_USER
        });
      }
    });
  };
}

export function authError(error) {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
}
