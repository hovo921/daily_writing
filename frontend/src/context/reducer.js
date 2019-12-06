import {LOGIN_SUCCESS} from "./actions";

export const initialState = {
    isLoading: false,
    isLoggedIn: false,
};

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case LOGIN_SUCCESS: {
            return {...state, isLoggedIn: true}
        }
        default:
            return state;
    }
}
