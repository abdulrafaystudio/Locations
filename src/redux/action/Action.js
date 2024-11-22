import { ADD_LOCATION,REMOVE_LOCATION } from "./ActionTypes";

export const addLocation = (item) => ({
    type: ADD_LOCATION,
    data: item,
});


export const removeLocation = (item) => ({
    type: REMOVE_LOCATION,
    data: item,
});
