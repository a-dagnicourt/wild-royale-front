import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DATA } from '../store/actionTypes/pageTitle';

const Data = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: DATA }), []);

  return <h2>{t('Data.1')}</h2>;
};

export default Data;
