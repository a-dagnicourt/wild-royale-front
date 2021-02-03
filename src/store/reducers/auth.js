const initialState = { email: '', password: '', cognito: '', isAuth: false };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_EMAIL_PASSWORD':
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    case 'SET_COGNITO_DATA':
      return {
        ...state,
        cognito: action.payload,
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
