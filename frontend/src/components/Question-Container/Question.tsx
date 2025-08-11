import { useState, useEffect } from "react";
import ListGroup from "../ListGroup/ListGroup";
import "./Question.css";

const Question = () => {
  const [items, setItems] = useState([]);
  const [questionHeading, setQuestionHeading] = useState(""); // State to store the question heading

  useEffect(() => {
    fetch('http://localhost:8081/assessments')
      .then(res => res.json())
      .then(data => {
        const fetchedItems = data.map((data:any , index:number) => [
          data.Correct_Ans,
          data.Incorrect1,
          data.Incorrect2,
          data.Incorrect3
        ]).flat(); // Flatten the array of arrays into a single array
        setItems(fetchedItems);

        // Set the question heading separately
        if (data.length > 0) {
          setQuestionHeading(data[0].Question); // Assuming the first question's data is used as the heading
        }
      })
      .catch(err => console.log(err));
  }, 
  []);

  const handleSelectItem = (data : any) => {
    console.log(data);
  };

  return (
    <div className="question-container">
      <div className="test-header"> 
      </div>
      <ListGroup
        items={items}
        heading={questionHeading}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
};

export default Question;