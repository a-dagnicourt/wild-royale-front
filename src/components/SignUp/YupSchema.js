import * as yup from 'yup';

export const CompanySchema = {
  label: yup.string().min(3).max(30).required(),
  SIRET_number: yup
    .string()
    .matches(/^[0-9]{14}$/)
    .required(),
  street: yup.string().min(5).max(80).required(),
  VAT_number: yup
    .string()
    .matches(/^[0-9]{11}$/)
    .required(),
  city: yup
    .string()
    .matches(/^[A-zÀ-ÿ]+((?:. |-| |')*[A-zÀ-ÿ])*$/)
    .min(3)
    .max(30)
    .required(),
  zip_code: yup.string().length(5).required(),
  country: yup
    .string()
    .matches(
      /^A[^ABCHJKNPVY]|B[^CKPUX]|C[^BEJPQST]|D[EJKMOZ]|E[CEGHRST]|F[IJKMOR]|G[^CJKOVXZ]|H[KMNRTU]|I[DELMNOQRST]|J[EMOP]|K[EGHIMNPRWYZ]|L[ABCIKRSTUVY]|M[^BIJ]|N[ACEFGILOPRUZ]|OM|P[^BCDIJOPQUVXZ]|QA|R[EOSUW]|S[^FPQUW]|T[^ABEIPQSUXY]|U[AGMSYZ]|V[ACEGINU]|WF|WS|YE|YT|Z[AMW]$/
    )
    .required(),
};
export const CompanySchemaGlobal = yup.object().shape({
  ...CompanySchema,
});

export const userSchema = {
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/
    )
    .required(),
  firstname: yup
    .string()
    .matches(/^[A-zÀ-ÿ]+((\s)?(('|-|)?([A-zÀ-ÿ])+))*$/)
    .min(3)
    .max(30)
    .required(),
  lastname: yup
    .string()
    .matches(/^[A-zÀ-ÿ]+((\s)?(('|-|)?([A-zÀ-ÿ])+))*$/)
    .min(3)
    .max(30)
    .required(),
  email: yup.string().email().required(),
  phone_number: yup
    .string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/)
    .required(),
  job_title: yup
    .string()
    .matches(/^[A-zÀ-ÿ]+((\s)?(('|-|)?([A-zÀ-ÿ])+))*$/)
    .min(3)
    .max(50)
    .required(),
  language: yup
    .string()
    .matches(/^[A-zÀ-ÿ]*$/)
    .min(6)
    .max(7)
    .required(),
};
export const userSchemaGlobal = yup.object().shape({
  ...userSchema,
});
