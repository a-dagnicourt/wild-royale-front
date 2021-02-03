import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { MALL } from '../store/actionTypes/pageTitle';

const Mall = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: MALL }), []);

  return <h2>{t('Mall.1')}</h2>;
};

export default Mall;
