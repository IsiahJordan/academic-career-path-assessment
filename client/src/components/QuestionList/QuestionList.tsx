import styles from './QuestionList.module.css'
import QuestionCard from '@/components/QuestionCard'
import { useState } from 'react'

function QuestionList(testId: string){
  const questions = [
    {
      id: 1,
      question: "Which planet is known as the Red Planet?",
      options: [
        { id: 1, label: "A", text: "Earth" },
        { id: 2, label: "B", text: "Mars" },
        { id: 3, label: "C", text: "Jupiter" },
        { id: 4, label: "D", text: "Saturn" },
      ],
    },
    {
      id: 2,
      question: "What is the largest ocean on Earth?",
      options: [
        { id: 1, label: "A", text: "Atlantic Ocean" },
        { id: 2, label: "B", text: "Pacific Ocean" },
        { id: 3, label: "C", text: "Indian Ocean" },
        { id: 4, label: "D", text: "Arctic Ocean" },
      ],
    },
  ];


  // State for list of answers [{questionId, optionId}]
  const [answers, setAnswers] = useState([]);
  const correct = [1, 1]

  const handleSelect = (questionId, optionId) => {
    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (a) => a.questionId === questionId
      );

      if (existingIndex !== -1) {
        // Update existing answer
        const updated = [...prevAnswers];
        updated[existingIndex] = { questionId, optionId };
        return updated;
      } else {
        // Add new answer
        return [...prevAnswers, { questionId, optionId }];
      }
    });
  };

  const handleSubmit = () => {
    console.assert(JSON.stringify(correct) == JSON.stringify(answers.map(obj => obj.optionId)), 'Wrong');
  };
  
  return (
    <div>
    {questions.map((q, index) => (
        <QuestionCard
          key={q.id}
          question={q.question}
          options={q.options}
          selectedOptionId={
            answers.find((a) => a.questionId === q.id)?.optionId || null
          }
          onSelect={(optionId) => handleSelect(q.id, optionId)}
          questionIndex={index}
          totalQuestions={questions.length}
        />
      ))}
      <button className={styles.finish} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default QuestionList
