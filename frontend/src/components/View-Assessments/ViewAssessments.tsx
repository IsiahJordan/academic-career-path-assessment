import "./ViewAssessments.css";
import Navbar from "../Navbar/navbar";
import { useState, useEffect } from "react";
import AnswerAssessments from "../Answer-Assessment/AnswerAssessments";

const ViewAssessments = () => {
  interface assessmentInfo {
    assessmentID: number;
    subjectID: number;
    assessment_title: string;
    Description: string;
  }

  //get data from local host
  const [data, setData] = useState<assessmentInfo[]>([]);
  useEffect(() => {
    fetch("http://localhost:8081/assessments")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const [viewAssess, setView] = useState();
  setView;

  const [showAnswerAssessment, setShowAnswerAssessment] = useState(false);
  const [selectedAssessmentID, setSelectedAssessmentID] = useState<any>(null);

  const handleSubmit = async (assessmentID: number) => {
    setShowAnswerAssessment(true);
    setSelectedAssessmentID(assessmentID);
  };

  return (
    <>
      <Navbar />
      {showAnswerAssessment ? (
        <AnswerAssessments assessmentID={selectedAssessmentID} />
      ) : (
        <div className="assessments-container">
          {data.slice(0, viewAssess).map((assessment, index) => (
            <div className="assessments" key={index}>
              <div className="assessment-heading">
                <h3>{assessment.assessment_title}</h3>
              </div>
              <div className="assessment-body">
                <p>{assessment.Description}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "6px",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    marginRight: "3%",
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleSubmit(assessment.assessmentID)}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewAssessments;
