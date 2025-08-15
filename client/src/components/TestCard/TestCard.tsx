import styles from './TestCard.module.css'
import { Link } from 'react-router-dom'
import { TestCardProps } from './types'

function TestCard({
  testId,
  title,
  content
}: TestCardProps){
  const questionId = "sajsaisaisjai"; // temporary test
  return (
    <div className={styles.container}> 
      <div className={styles.header}>
        { title }
      </div>
      <div className={styles.description}>
        { content }
      </div>
      <div className={styles.buttons}>
        <Link to={`/test/question/${questionId}`} className={styles.button}>Proceed</Link>
      </div>
    </div>
  );
}

export default TestCard
