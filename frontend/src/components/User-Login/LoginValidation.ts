
interface FormValues {
  email: string;
  password: string;
}

const LoginValidation = (values:FormValues) => {
  
  let errors: Partial<FormValues> = {}; // Use Partial to allow for undefined properties
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!values.email) {
    errors.email = "Email should not be empty";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "invalid email";
  } else {
    errors.email = "";
  }

  if (!values.password) {
    errors.password = "Password should not be empty";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "wrong password";
  } else {
    errors.password = "";
  }

  return errors;
  
}
export default LoginValidation;
