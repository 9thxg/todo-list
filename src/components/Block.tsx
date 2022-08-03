import { useState } from "react";
import { Data } from "../App";
import Item from "./Item";

const Block = ({ date, todos }: { date?: Date; todos?: Data[] }) => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleIsCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <div className="block">
      <div className="block_top">
        {todos ? (
          <button className="add_button" onClick={toggleIsCreate}>
            {"+"}
          </button>
        ) : (
          ""
        )}
        <div className="block_date">{date?.getDate()}</div>
      </div>
      {isCreate ? (
        <Item
          todo={{ id: 0, date: date?.getTime()!, isDone: false, content: "" }}
          isCreate={true}
        />
      ) : (
        ""
      )}
      <div className="todo_list">
        {todos && todos.map((it) => <Item key={it.id} todo={it} />)}
      </div>
    </div>
  );
};

export default Block;
