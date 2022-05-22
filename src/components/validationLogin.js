function validationLogin(user) {
  const { email, password } = user;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

  const errors = {};

  if (!email) {
    errors.emailError = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.emailError = 'Email is not valid';
  }

  if (!password) {
    errors.passwordError = 'Password is required';
  } else if (!passwordRegex.test(password)) {
    errors.passwordError =
      'password must contain minimum 5 characters, at least one letter and one number';
  }

  return errors;
}

export default validationLogin;
