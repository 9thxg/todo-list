import { useContext, useRef, useState } from "react";
import { Data, DispatchContext } from "../App";

const Item = ({ todo, isCreate }: { todo: Data; isCreate?: boolean }) => {
  // any 말고 다른 방법이 있을까?
  const { toggleDone, onRemove, onEdit, onCreate, forceUpdate }: any =
    useContext(DispatchContext);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState<string>(todo.content);
  // ref 타입 필요
  const contentRef = useRef();

  const handleSubmmit = () => {
    if (isCreate) {
      if (content.length < 1) {
        return;
      } else {
        onCreate(todo.date, content);
      }
    } else {
      if (content.length < 1) {
        return;
      } else {
        if (window.confirm("정말로 수정하시겠습니까?")) {
          onEdit(todo.id, todo.date, content, todo.isDone);
        }
      }
    }
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onRemove(todo.id);
    }
  };

  const handleCancle = () => {
    forceUpdate();
  };

  return (
    <div className="Item">
      {edit || isCreate ? (
        <div className="Todo_Content">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      ) : (
        <div className="Todo_Content">
          <div className="Content">{todo.content}</div>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => toggleDone(todo.id)}
          />
        </div>
      )}
      {edit || isCreate ? (
        <div className="Todo_Button">
          <button onClick={handleSubmmit}>완료</button>
          {isCreate ? (
            <button onClick={handleCancle}>취소</button>
          ) : (
            <button onClick={handleRemove}>삭제</button>
          )}
        </div>
      ) : (
        <div className="Todo_Button">
          <button onClick={toggleEdit}>수정</button>
          <button onClick={handleRemove}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default Item;
