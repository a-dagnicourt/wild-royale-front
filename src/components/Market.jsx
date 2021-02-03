import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { MARKET } from '../store/actionTypes/pageTitle';

const Market = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: MARKET }), []);

  return <h2>{t('Market.1')}</h2>;
};

export default Market;
