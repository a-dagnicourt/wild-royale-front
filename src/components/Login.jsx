import { useTranslation } from 'react-i18next';

function Login() {
  const { t, i18n } = useTranslation();
  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <>
      <h2>{t('Login.1')}</h2>
      <button onClick={() => handleClick('fr')} type="button">
        Français
      </button>
      <button onClick={() => handleClick('en')} type="button">
        English
      </button>
    </>
  );
}

export default Login;
