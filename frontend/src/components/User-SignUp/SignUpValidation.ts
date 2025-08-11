
interface FormValues {
    firstname: string;
    lastname: string;
    gender: string;
    city: string;
    email: string;
    password: string;
    
  }
  
  const SignUpValidation = (values:FormValues) => {
    
    let errors: Partial<FormValues> = {}; // Use Partial to allow for undefined properties
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    //FIRSTNAME VALIDATION
    if (!values.firstname) {
      errors.firstname = "firstname should not be empty";
    }  else {
      errors.firstname = "";
    }

    //LASTNAME VALIDATION
    if (!values.lastname) {
      errors.lastname = "lastname should not be empty";
    }  else {
      errors.lastname = "";
    }

    //GENDER VALIDATION
    var radios = document.getElementsByName("gender") as NodeListOf<HTMLInputElement>;
    if (!(radios[0].checked || radios[1].checked)) {
      errors.gender = "select your gender";
    }else{
      errors.gender="";
    }

    //CITY VALIDATION
    const selectedValue = values.city;
    if (selectedValue === "") {
      // Handle the case where no city is selected
      errors.city = "select your city";
    } else {
      //HANDLE WHEN SELECTED
      errors.city ="";
    }

    //EMAIL VALIDATION
    if (!values.email) {
      errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Email is not valid";
    } else {
      errors.email = "";
    }
    
    //PASSWORD VALIDATION
    if (!values.password) {
      errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
      errors.password = "Password is not valid. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:";
    }else {
      errors.password = "";
    }
  
    return errors;
    
  }
  export default SignUpValidation;
  