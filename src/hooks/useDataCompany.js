import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CHANGE_DATA_COMPANY } from '../store/reducers/dataCompany';

export default function useDataCompany() {
  const dispatch = useDispatch();

  const newData = useSelector((state) => state.company, shallowEqual);

  const setNewData = (data) => {
    dispatch({
      type: CHANGE_DATA_COMPANY,
      payload: { ...data },
    });
  };

  return {
    newData,
    setNewData,
  };
}
