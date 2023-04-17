export function loginValidate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email cannot be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password cannot be empty";
  } else if (values.password.length < 2 || values.password.length > 10) {
    errors.password = "Must be greater than 2 and less than 10 characters long";
  }

  return errors;
}
