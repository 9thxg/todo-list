import { Data } from "../App";

const Item = ({
  todo,
  switchDone,
}: {
  todo: Data;
  switchDone: (targetId: number) => void;
}) => {
  return (
    <div className="Item">
      <div className="Todo_Content">
        <div className="Content">{todo.content}</div>
        <input type="checkbox" onChange={(e) => switchDone(todo.id)} />
      </div>
      <div className="Todo_Button">
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default Item;
