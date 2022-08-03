import { useContext } from "react";
import { Data, DispatchContext } from "../App";

const Item = ({ todo }: { todo: Data }) => {
  // any 말고 다른 방법이 있을까?
  const { onToggle }: any = useContext(DispatchContext);

  return (
    <div className="Item">
      <div className="Todo_Content">
        <div className="Content">{todo.content}</div>
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => onToggle(todo.id)}
        />
      </div>
      <div className="Todo_Button">
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default Item;
