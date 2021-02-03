import { useDispatch } from 'react-redux';

function UseDisabledButton() {
  const dispatch = useDispatch();

  const disableButton = () => {
    return dispatch({ type: 'SET_DISABLE_BUTTON', payload: true });
  };
  const ableButton = () => {
    return dispatch({ type: 'SET_ABLE_BUTTON', payload: false });
  };
  return { disableButton, ableButton };
}
export default UseDisabledButton;
