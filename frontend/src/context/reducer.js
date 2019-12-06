import { LOGIN_SUCCESS, GET_VERIFEMAIL } from "./actions";

export const initialState = {
  isLoading: false,
  isLoggedIn: false,
};

export const reducer = (state, { type, payload }) => {
  console.log('payload', payload);
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    case GET_VERIFEMAIL: {
        return { ...state, verifyEmail: payload}
    }
    default:
      return state;
  }
};
