import { TEST_ACTION } from "../actions/app";

export default (state = { test: "" }, action) => {
  switch (action.type) {
    case TEST_ACTION:
      return { ...state, test: action.payload };
    default:
      return state;
  }
};
