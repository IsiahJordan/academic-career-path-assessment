import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar"
import "./createdQuestions.css"
import Question from "../Question-Container/Question";

const createdQuestions = () => {
    const [data, setData] = useState([])
    useEffect(()=> {
      fetch('http://localhost:8081/assessments')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
    },[])
  return (
    
    <div className="">
      <Navbar />
      <div className="myContainer">
        <table className="table ">
          <thead className="thead">
            <tr>
              <th>QuestionID</th>
              <th>SubjectID</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Incorrect Answer #1</th>
              <th>Incorrect Answer #2</th>
              <th>Incorrect Answer #3</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data: any, index: number) => (
              <tr key={index}>
                <td>{data.QuestionID}</td>
                <td>{data.subjectID}</td>
                <td>{data.Question}</td>
                <td>{data.Correct_Ans}</td>
                <td>{data.Incorrect1}</td>
                <td>{data.Incorrect2}</td>
                <td>{data.Incorrect3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Question/>
    </div>
  )
}

export default createdQuestions