import { Data } from "../App";

const Block = ({ date, datas }: { date?: number; datas?: Data[] }) => {
  console.log(datas);
  return (
    <div className="block">
      <div className="block_date">{date}</div>
      <div className="todo_list"></div>
      {datas && datas.map((it) => <div>{it.content}</div>)}
    </div>
  );
};

export default Block;
