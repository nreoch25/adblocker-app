import axios from "axios";

export const FETCH_INVENTORY = "FETCH_INVENTORY";

export function fetchInventory() {
  return (dispatch) => {
    return axios.get("/api/images").then(response => {
      dispatch({
        type: FETCH_INVENTORY,
        payload: response.data.images
      })
    }).catch(error => {
      console.log(error);
    });
  }
}
