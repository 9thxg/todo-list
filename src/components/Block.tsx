import { Data } from "../App";
import Item from "./Item";

const Block = ({ date, todos }: { date?: number; todos?: Data[] }) => {
  return (
    <div className="block">
      <div className="block_date">{date}</div>
      <div className="todo_list"></div>
      {todos && todos.map((it) => <Item key={it.id} todo={it} />)}
    </div>
  );
};

export default Block;
