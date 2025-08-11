import { question,questionContent } from "./CreateAssessment";
interface FormValues {
    subjectID: string;
    Description: string;
    Question: string;
    Correct_Ans: string;
    Incorrect1: string;
    Incorrect2: string;
    Incorrect3: string;
    
  }

interface ValuesType {
    subjectID: string;
    Description: string;
    [key: string]: string; // This allows any string key with a string value
  }
  
  

  
  const CreateAssessmentValidation = (values : ValuesType) => {

    let errors: Partial<ValuesType> = {}; // Use Partial to allow for undefined properties
    
    
    //FIRSTNAME VALIDATION
    if (!values.subjectID) {
      errors.subjectID = "Subject should not be empty";
    }  else {
      errors.subjectID = "";
    }

    if (!values.Description) {
      errors.Description = "Description should not be empty";
    }  else {
      errors.Description = "";
    }
 
   
     // Validate questions
  for (let i = 0; i < question.length; i++) {
    const questionData = questionContent[i];

    // Validate Question
    if (!questionData.Question) {
      errors[`Question_${i}`] = "Question should not be empty";
    } else {
      errors[`Question_${i}`] = "";
    }

    // Validate Correct_Ans
    if (!questionData.Correct_Ans) {
      errors[`Correct_Ans_${i}`] = "Correct Answer should not be empty";
    } else {
      errors[`Correct_Ans_${i}`] = "";
    }

    // Validate Incorrect1
    if (!questionData.Incorrect1) {
      errors[`Incorrect1_${i}`] = "Incorrect Answer #1 should not be empty";
    } else {
      errors[`Incorrect1_${i}`] = "";
    }

    // Validate Incorrect2
    if (!questionData.Incorrect2) {
      errors[`Incorrect2_${i}`] = "Incorrect Answer #2 should not be empty";
    } else {
      errors[`Incorrect2_${i}`] = "";
    }

    // Validate Incorrect3
    if (!questionData.Incorrect3) {
      errors[`Incorrect3_${i}`] = "Incorrect Answer #3 should not be empty";
    } else {
      errors[`Incorrect3_${i}`] = "";
    }
  }

  return errors;
};
    
  
  export default CreateAssessmentValidation