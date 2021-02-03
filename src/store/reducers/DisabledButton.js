const initialState = { isDisable: true };

function disablebuttonreducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DISABLE_BUTTON':
      return {
        ...state,
        isDisable: action.payload,
      };
    case 'SET_ABLE_BUTTON':
      return {
        ...state,
        isDisable: action.payload,
      };
    default:
      return state;
  }
}

export default disablebuttonreducer;
