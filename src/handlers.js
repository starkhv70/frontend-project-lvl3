import { string } from 'yup';

const validateUrl = (url, urls) => string()
  .required('requiredField')
  .url('invalidUrl')
  .notOneOf(urls, 'notUnique')
  .validate(url)
  .then(() => null)
  .catch((e) => ({ isError: true, message: e.message }));

export default () => {};
