export const CHANGE_USER_ROLE = 'CHANGE_USER_ROLE';

const initialUserRole = {};

function roleReducer(userRole = initialUserRole, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_ROLE:
      return {
        ...payload,
      };

    default:
      return userRole;
  }
}

export default roleReducer;
