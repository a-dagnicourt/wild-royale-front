import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { MAP } from '../store/actionTypes/pageTitle';

const Map = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: MAP }), []);

  return <h2>{t('Map.1')}</h2>;
};

export default Map;
