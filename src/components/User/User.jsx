import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { USER } from '../../store/actionTypes/pageTitle';
import Smallnav from './Smallnav';

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: USER }), []);

  return (
    <div>
      <Smallnav />
    </div>
  );
};

export default User;
