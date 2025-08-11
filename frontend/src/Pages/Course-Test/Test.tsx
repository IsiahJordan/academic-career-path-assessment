import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import Question from "../../components/Question-Container/Question";
import "./Test.css";
import { useState } from "react";

function App() {
  //Alert Visibility set to false
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div className="test-container">
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}> Submitted! </Alert>
      )}

      <Question />

      <div className="button">
        <Button color="primary" onClick={() => setAlertVisibility(true)}>
          Submit
        </Button>
      </div>

      <div></div>
    </div>
  );
}

export default App;
