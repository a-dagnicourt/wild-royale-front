import { useDispatch } from 'react-redux';

function useAuth() {
  const dispatch = useDispatch();

  const signOut = () => {
    return dispatch({ type: 'SET_IS_AUTH', payload: false });
  };

  return { signOut };
}
export default useAuth;
