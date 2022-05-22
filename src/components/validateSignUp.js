const validateSignUp = (user) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  let errors = {};
  if (!user.email) {
    errors.emailError = 'Email is required!';
  } else if (!emailRegex.test(user.email)) {
    errors.emailError = 'Email is not valid..!';
  }

  if (!user.password) {
    errors.passwordError = 'Password is required!';
  } else if (!passwordRegex.test(user.password)) {
    errors.passwordError =
      'your password must contain minimum 5 characters, at least one letter and one number';
  }
  if (!user.confrimPassword) {
    errors.confrimError = 'Confrim Password is required!';
  } else if (user.confrimPassword !== user.password) {
    errors.confrimError = 'Passwordss did not match..!';
  }

  return errors;
};

export default validateSignUp;
