import { Data } from "../App";

const Block = ({ date, todos }: { date?: number; todos?: Data[] }) => {
  console.log(todos);
  return (
    <div className="block">
      <div className="block_date">{date}</div>
      <div className="todo_list"></div>
      {todos && todos.map((it) => <div>{it.content}</div>)}
    </div>
  );
};

export default Block;
