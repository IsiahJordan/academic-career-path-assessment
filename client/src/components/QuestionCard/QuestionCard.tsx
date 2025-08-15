import styles from './QuestionCard.module.css'
import { QuestionProps } from './types'

function QuestionCard({
  question,
  options,
  selectedOptionId,
  onSelect,
  questionIndex,
  totalQuestions,
}: QuestionCardProps){

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        Question {questionIndex + 1} of {totalQuestions}
      </div>
      <h2 className={styles.text}>{question}</h2>
      <ul className={styles.list}>
        {options.map((option) => (
          <li key={option.id}>
            <label className={`${styles.option} ${selectedOptionId === option.id ? styles.select : ''}`}>
              <input
                type="radio"
                name={`option-${questionIndex}`}
                value={option.id}
                checked={selectedOptionId === option.id}
                onChange={() => onSelect(option.id)}
              />
              <span>{option.label}. {option.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionCard;
