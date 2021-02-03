import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NOTIFICATION } from '../store/actionTypes/pageTitle';

const Notification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: NOTIFICATION }), []);

  return <h2>{t('Notification.1')}</h2>;
};

export default Notification;
