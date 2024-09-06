import { useState } from "react";

interface ListGroupProps {
  items: string[];
  headings: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, headings, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function Message() {
    return items.length === 0 ? <p>No items founds</p> : null;
  }

  return (
    <>
      <h1>{headings}</h1>
      {Message()}

      <ul className="list-group">
        {items.map((item, index) => (
          <li
            // className="list-group-item active"
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

