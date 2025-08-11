import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAssessment.css";
import CreateAssessmentValidation from "./CreateAssessmentValidation";
import Navbar from "../Navbar/navbar";
import AdminNav from "../Jordi-admin-user/admin_nav";


const CreateAssessment = () => {
  
  interface ValuesType {
    title: string;
    subjectID: string;
    Description: string;
    [key: string]: string; // This allows any string key with a string value
  }

  //get data
  const [values, setValues] = useState<ValuesType>({
    title:"",
    subjectID: "",
    Description: "",
    Question: "",
    Correct_Ans: "",
    Incorrect1: "",
    Incorrect2: "",
    Incorrect3: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // When form button is clicked call LoginValidation

  const handleInput = (event: any) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit =async (event: any) => {
    event.preventDefault();

    const validationErrors = CreateAssessmentValidation(values);
    const errors = validationErrors as { [key: string]: string }; // Explicitly cast to the required type
    setErrors(errors);

    if (
      validationErrors.subjectID === "" &&
      validationErrors.Description === ""
    ) {
      const payload = {
        title: values.title,
        subjectID: values.subjectID,
        Description: values.Description,
        questions: questionContent,
      };

      console.log(payload);
      await axios
        .post("http://localhost:8081/createAssessment", payload)
        .then(() => {
          
          alert("created successfully");
        })
        .catch((err) => console.log(err));

        await axios
        .post("http://localhost:8081/createAssessment/insert", payload)
        .then(() => {
          navigate("/assessments");
        })
        .catch((err) => console.log(err));
    }
  };

  const [numQuestions, setNumQuestions] = useState(1);
  const addQuestion = () => {
    setNumQuestions(numQuestions + 1);
  };

  const question: any = [];
  const questionContent: any = [];

  for (let i = 0; i < numQuestions; i++) {
    questionContent.push({
      Question: values[`Question_${i}`],
      Correct_Ans: values[`Correct_Ans_${i}`],
      Incorrect1: values[`Incorrect1_${i}`],
      Incorrect2: values[`Incorrect2_${i}`],
      Incorrect3: values[`Incorrect3_${i}`],
    });

    question.push(
      <div className="myQuestions" key={i}>
        <div className="mb-3">
          <h2 className="form-label" style={{ paddingBottom: "1%" }}>
            Question {i + 1}
          </h2>
          <textarea
            className="form-control"
            name={`Question_${i}`}
            value={values[`Question_${i}`]}
            onChange={handleInput}
          ></textarea>
          {errors[`Question_${i}`] && (
            <span className="text-danger">{errors[`Question_${i}`]}</span>
          )}
        </div>

        <div className="Cont1">
          <div className="Correct mb-3">
            <label className="form-label">
              <strong>Correct Answer : </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name={`Correct_Ans_${i}`}
              value={values[`Correct_Ans_${i}`]}
              onChange={handleInput}
              style={{ outline: "auto", outlineColor:"lightgreen" }}
            />
            {errors[`Correct_Ans_${i}`] && (
              <span className="text-danger">{errors[`Correct_Ans_${i}`]}</span>
            )}
          </div>
          <div className="Incorrect1 mb-3">
            <label className="form-label">
              <strong>Incorrect Answer #1 :</strong>
            </label>
            <input
              type="text"
              className="form-control"
              name={`Incorrect1_${i}`}
              value={values[`Incorrect1_${i}`]}
              onChange={handleInput}
              style={{ outline: "auto", outlineColor:"red" }}
            />
            {errors[`Incorrect1_${i}`] && (
              <span className="text-danger">{errors[`Incorrect1_${i}`]}</span>
            )}
          </div>
        </div>
        <div className="Cont2">
          <div className="Incorrect2 mb-3">
            <label className="form-label">
              <strong>Incorrect Answer #2 :</strong>
            </label>
            <input
              type="text"
              className="form-control"
              name={`Incorrect2_${i}`}
              value={values[`Incorrect2_${i}`]}
              onChange={handleInput}
              style={{ outline: "auto", outlineColor:"red" }}
            />
            {errors[`Incorrect2_${i}`] && (
              <span className="text-danger">{errors[`Incorrect2_${i}`]}</span>
            )}
          </div>
          <div className="Incorrect3 mb-3">
            <label className="form-label">
              <strong>Incorrect Answer #3 :</strong>
            </label>
            <input
              type="text"
              className="form-control"
              name={`Incorrect3_${i}`}
              value={values[`Incorrect3_${i}`]}
              onChange={handleInput}
              style={{ outline: "auto", outlineColor:"red" }}
            />
            {errors[`Incorrect3_${i}`] && (
              <span className="text-danger">{errors[`Incorrect3_${i}`]}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div>
      <AdminNav />
      <div className="CreateAssessment-form-layout">
        <h1 style={{ paddingBottom: 50 }}>Create Assessment</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "15px",
          }}
        >
          <p style={{ paddingTop: "1%", paddingRight: "1%" }}>
            Add more questions
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={addQuestion}
          >
            +
          </button>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="title mb-3">
            <label className="form-label">
              <strong>Title</strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={values.title}
              onChange={handleInput}
            />
            {errors.subjectID && (
              <span className="text-danger">{errors.subjectID}</span>
            )}
          </div>

          <div className="subject mb-3">
            <label className="form-label">
              <strong>Subject</strong>
            </label>
            <select
              className="form-select form-select"
              name="subjectID"
              id="subjectID"
              value={values.subjectID}
              onChange={handleInput}
            >
              <option value=""></option>
              <option value="1">Mathematics</option>
              <option value="2">Science</option>
              <option value="3">English</option>
            </select>
            {errors.subjectID && (
              <span className="text-danger">{errors.subjectID}</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Description</strong>
            </label>
            <textarea
              className="form-control"
              name="Description"
              value={values.Description}
              onChange={handleInput}
            ></textarea>
            {errors.Description && (
              <span className="text-danger">{errors.Description}</span>
            )}
          </div>

          <div className="Create-Questions">{question}</div>

          <div className="CreateAssessment-SubmitButton">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontSize: "18px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessment;
export const question: any = [];
export const questionContent: any = [];
