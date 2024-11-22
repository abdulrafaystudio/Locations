import { ADD_LOCATION,REMOVE_LOCATION } from "../action/ActionTypes";


const initialState = [];


export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOCATION:
            return [
                ...state,
                action.data,
            ]
            case REMOVE_LOCATION:
                let result = state.filter(item => item.id != action.data)
                return [...result]

        default:
            return state

    }

}