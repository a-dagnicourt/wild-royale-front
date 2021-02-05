export const CHANGE_DATA_USER = 'CHANGE_DATA_USER';

const initialDataUser = {};

function reducerUser(dataUser = initialDataUser, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_DATA_USER:
      return {
        ...payload,
      };

    default:
      return dataUser;
  }
}

export default reducerUser;
