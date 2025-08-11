import { useState, useEffect } from "react";
import "./AnswerAssessments.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ViewAssessments from "../View-Assessments/ViewAssessments";
import { useUser } from '../User-Context/UserContext';

interface assessmentInfo {
  questions: string;
  correct_answer: string;
  incorrect1: string;
  incorrect2: string;
  incorrect3: string;
  shuffled_answers: string[]; // optional type
}

interface AnswerAssessmentsProps {
  assessmentID: number;
}

const AnswerAssessments: React.FC<AnswerAssessmentsProps> = ({
  assessmentID,
}) => {
  //get data from local host
  const [data, setData] = useState<assessmentInfo[]>([]);
  const [viewAssess, setView] = useState();
  setView;
  const [activeItem, setActiveItem] = useState<Array<string | null>>([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [viewAssessments, setViewAssessments] = useState(false);
  const navigate = useNavigate();
  const { userData } = useUser();

  useEffect(() => {
    fetch(`http://localhost:8081/assessments/questions/${assessmentID}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // Shuffle answers for each question
        data.forEach((assessment: any) => {
          const shuffledAnswers = _.shuffle([
            assessment.correct_answer,
            assessment.incorrect1,
            assessment.incorrect2,
            assessment.incorrect3,
          ]);
          assessment.shuffled_answers = shuffledAnswers;
        });
      })
      .catch((err) => console.log(err));
    if (data.length > 0) {
      setActiveItem(new Array(data.length).fill(null));
    }
  }, [assessmentID]);

  const handleSelectItem = (item: string, questionIndex: number) => {
    setActiveItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[questionIndex] = item;
      return updatedItems;
    });
    console.log(item); // Print the selected item in the console
  };

  const handleSubmit = async () => {
    // Calculate score
    let percentageScore = 0;
    let correctAnswers = 0;
    for (let i = 0; i < data.length; i++) {
      if (activeItem[i] === data[i].correct_answer) {
        correctAnswers++;
      }
    }

      percentageScore = Math.round((correctAnswers / data.length) * 100);
      setScore(percentageScore);
      setShowScore(true);
      
      //---------------------posting------------------------------------------------- 
    
    const finalScore = percentageScore;
    const payload = {
      userID: userData?.userID,
      assessmentID: assessmentID,
      testScore : finalScore
    };

    await axios
      .post("http://localhost:8081/assessments/testResults",payload)
      .then(() => {
        
        alert("Submitted Successfully");
      })
      .catch((err) => console.log(err));
  };

  const ScorePopup = () => {
    return (
      <>
        {viewAssessments ? (
          <div>{viewAssessments && <ViewAssessments />}</div>
        ) : (
          <div className="score-container">
            <div className="score-popup">
              <h2>Your Score:</h2>
              <div className="Score">
                <p>
                  <strong>{score}%</strong>
                </p>
              </div>
            </div>
            <div className="close-button">
              <Link to="/home">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowScore(false)}
                  style={{ fontSize: "30px" }}
                >
                  Close
                </button>
              </Link>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {showScore ? (
        <div>{showScore && <ScorePopup />}</div>
      ) : (
        <div className="test-container">
          {data.slice(0, viewAssess).map((assessment, index) => (
            <div
              className="test-cards"
              key={`assessment_${assessmentID}_${index}`}
            >
              <div className="test-heading">
                <h3>Question {index + 1}</h3>
                <p>{assessment.questions}</p>
              </div>
              <div className="test-body">
                <div className="test-questions">
                  <div className="list-group">
                    {assessment.shuffled_answers?.map((answer, answerIndex) => (
                      <a
                        className={`list-group-item list-group-item-action ${
                          activeItem[index] === answer ? "active" : ""
                        }`}
                        onClick={() => handleSelectItem(answer, index)}
                        key={`assessment_${answer}_${index}`}
                      >
                        {answer}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="CreateAssessment-SubmitButton">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontSize: "18px", marginRight: "15%" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerAssessments;
