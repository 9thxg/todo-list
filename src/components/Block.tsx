const Block = ({ date }: { date?: number }) => {
  return (
    <div className="block">
      <div className="block_date">{date}</div>
      <div className="todo_list"></div>
    </div>
  );
};

export default Block;
