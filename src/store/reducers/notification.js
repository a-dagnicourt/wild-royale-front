export const CHANGE_USER_NOTIFICATION = 'CHANGE_USER_NOTIFICATION';

const initialUserNotification = {};

function notificationReducer(
  userNotification = initialUserNotification,
  action
) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_NOTIFICATION:
      return {
        ...payload,
      };

    default:
      return userNotification;
  }
}

export default notificationReducer;
