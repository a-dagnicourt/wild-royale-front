import {
  HOME,
  NOTIFICATION,
  MARKET,
  DATA,
  MAP,
  MALL,
  USER,
  LOGIN,
} from '../actionTypes/pageTitle';

const initialPageTitle = {
  title: 'LoginTitle',
};

function reducer(pageTitle = initialPageTitle, action) {
  switch (action.type) {
    case HOME:
      return {
        ...pageTitle,
        title: 'HomeTitle',
      };

    case NOTIFICATION:
      return {
        ...pageTitle,
        title: 'NotificationTitle',
      };

    case MARKET:
      return {
        ...pageTitle,
        title: 'MarketTitle',
      };

    case DATA:
      return {
        ...pageTitle,
        title: 'DataTitle',
      };

    case MAP:
      return {
        ...pageTitle,
        title: 'MapTitle',
      };

    case MALL:
      return {
        ...pageTitle,
        title: 'MallTitle',
      };

    case USER:
      return {
        ...pageTitle,
        title: 'UserTitle',
      };

    case LOGIN:
      return {
        ...pageTitle,
        title: 'LoginTitle',
      };

    default:
      return pageTitle;
  }
}

export default reducer;
