import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import app from "./AppReducer";
import auth from "./AuthReducer";

export default combineReducers({
  form,
  app,
  auth
});
