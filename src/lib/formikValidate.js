export function loginValidate(values) {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.password.length < 2 || values.password.length > 10) {
    errors.password = "Must be greater than 2 and less than 10 characters long";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  if (!/^[A-Z0-9]+$/i.test(values.username)) {
    errors.username = "Username can only contains letter or number"
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.password.length < 2 || values.password.length > 10) {
    errors.password = "Must be greater than 2 and less than 10 characters long";
  }

  if (values.confirm !== values.password) {
    errors.confirm = "Those passwords did not match";
  }

  return errors;
}