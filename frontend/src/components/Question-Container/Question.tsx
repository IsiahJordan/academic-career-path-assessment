import ListGroup from "../ListGroup/ListGroup";
import "./Question.css";
// ListGroup
// Add data from database
const items = [
  "New York",
  "San Francisco",
  "Tokyo",
  "London",
  "Paris",
  "Kalaw",
];

//EventHandler onClick item From ListGroup
const handleSelectItem = (item: string) => {
  console.log(item);
};

const Question = () => {
  return (
    <div className="question-container">
      <div className="test-header"></div>
      <ListGroup
        items={items}
        heading="Question"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
};

export default Question;
