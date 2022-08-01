import { Data } from "../App";
import Item from "./Item";

const Block = ({
  date,
  todos,
  switchDone,
}: {
  date?: number;
  todos?: Data[];
  switchDone: (targetId: number) => void;
}) => {
  return (
    <div className="block">
      <div className="block_date">{date}</div>
      <div className="todo_list"></div>
      {todos && todos.map((it) => <Item todo={it} switchDone={switchDone} />)}
    </div>
  );
};

export default Block;
