import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CHANGE_DATA_USER } from '../store/reducers/dataUser';

export default function useDataUser() {
  const dispatch = useDispatch();

  const newUser = useSelector((state) => state.user, shallowEqual);

  const setNewUser = (data) =>
    dispatch({
      type: CHANGE_DATA_USER,
      payload: { ...data },
    });

  return {
    newUser,
    setNewUser,
  };
}
