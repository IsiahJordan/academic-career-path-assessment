import { useState } from "react";
import "./ListGroup.css"

interface Props{
    items: string[];
    heading: string;

    //property that contains string and returns void
    onSelectItem: (item: string )=> void;
}

function ListGroup({items , heading, onSelectItem}:Props) {
  //-1 means no index selected
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className="container">
      <h1> {heading} </h1>
      <p> Which city are you from?</p>
      {items.length === 0 && <p>No Item Found!</p>}
      <ul className="list-group">

        {items.map((item, index) => (
          <li
            //ternary
            className={selectedIndex === index? "list-group-item active" : "list-group-item"}
            //primary key
            key={item}
            //event handling
            onClick={() => { setSelectedIndex(index); onSelectItem(item) } }>
            
            {item}
          </li>
        ))}

      </ul>
    </div>
  );
}
export default ListGroup;
