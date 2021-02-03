export const CHANGE_USER_PRODUCT = 'CHANGE_USER_PRODUCT';

const initialUserProduct = {};

function reducer(userProduct = initialUserProduct, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_PRODUCT:
      return {
        ...payload,
      };

    default:
      return userProduct;
  }
}

export default reducer;
