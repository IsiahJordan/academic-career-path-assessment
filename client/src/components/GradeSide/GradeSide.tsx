import styles from './GradeSide.module.css'
import { GradeSideProps } from './types'

function GradeSide({
  classes,
  options
}: GradeSideProps){
  return (
    <div className={styles.side}>
      <div className={styles.textbox}>
        <label for="searchbar" className={styles.label}>Enter Class</label>
        <input type="search" name="searchbar" className={styles.input} placeholder="Search Class..."/>
      </div>
      <div className={styles.toggle}>
        <label for="category">Category</label>
        <select className={styles.dropdown} name="category">
          {options.map((opt) => (
            <option value={opt.toLowerCase()}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default GradeSide
