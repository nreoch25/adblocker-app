import { FETCH_INVENTORY } from "../actions/app";

export default (state = { inventory: [] }, action) => {
  switch (action.type) {
    case FETCH_INVENTORY:
      return { ...state, inventory: action.payload };
    default:
      return state;
  }
};
