export const CHANGE_DATA_COMPANY = 'CHANGE_DATA_COMPANY';

const initialDataCompany = {};

function reducerCompany(dataCompany = initialDataCompany, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_DATA_COMPANY:
      return {
        ...payload,
      };

    default:
      return dataCompany;
  }
}

export default reducerCompany;
