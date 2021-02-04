const initialState = { email: '', password: '', isAdmin: true, isAuth: false };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_EMAIL_PASSWORD':
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    case 'SET_ADMIN':
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
      };
    case 'SET_IS_AUTH':
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
