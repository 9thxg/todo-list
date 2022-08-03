import React, {
  useEffect,
  useReducer,
  useState,
  createContext,
  useRef,
} from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Calendar from "./pages/Calendar";
import dummyData from "./dummyData.json";

type Action_type = "INIT" | "EDIT" | "CREATE" | "REMOVE" | "FORCEUPDATE";

export interface Data {
  id: number;
  date: number;
  content: string;
  isDone: boolean;
}

interface Action {
  type: Action_type;
  todoList?: Data[];
  todo?: Data;
  targetId?: number;
}

const reducer = (state: Data[], action: Action): Data[] => {
  let newState: Data[] = [];
  switch (action.type) {
    case "INIT": {
      const sortList = action.todoList!.sort((a, b) => b.id - a.id);
      return sortList;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.todo!.id ? { ...action.todo! } : it
      );
      break;
    }
    case "CREATE": {
      const newTodo: Data = {
        ...action.todo!,
      };
      newState = [newTodo, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "FORCEUPDATE": {
      newState = [...state];
      break;
    }
  }
  return newState;
};

export const TodoListContext = createContext<Data[] | undefined>(undefined);

export const DispatchContext = createContext<{} | undefined>(undefined);

function App() {
  const [todoData, dispatch] = useReducer(reducer, []);

  const [curDate, setCurDate] = useState(new Date());
  const [todoList, setTodoList] = useState(todoData);

  const dataId = useRef(0);

  useEffect(() => {
    dispatch({ type: "INIT", todoList: dummyData });
  }, []);

  useEffect(() => {
    if (todoData) {
      dataId.current = todoData[0]?.id + 1;
    }
    console.log(dataId);
  }, [todoData]);

  useEffect(() => {
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();
    setTodoList(
      todoData.filter((it) => firstDay <= it.date && it.date <= lastDay)
    );
    console.log(todoData);
  }, [curDate, todoData]);

  const toggleDone = (targetId: number) => {
    const todo = todoData.find((it) => targetId === it.id);
    const doneTodo = { ...todo!, isDone: !todo!.isDone };
    dispatch({ type: "EDIT", todo: doneTodo });
    console.log(todoData);
  };

  const onCreate = (date: number, content: string) => {
    dispatch({
      type: "CREATE",
      todo: {
        id: dataId.current,
        date: date,
        content: content,
        isDone: false,
      },
    });
    dataId.current += 1;
  };

  const onEdit = (
    targetId: number,
    date: number,
    content: string,
    isDone: boolean
  ) => {
    dispatch({
      type: "EDIT",
      todo: { id: targetId, date: date, content: content, isDone: isDone },
    });
  };

  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId: targetId });
  };

  const forceUpdate = () => {
    dispatch({ type: "FORCEUPDATE" });
  };

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <TodoListContext.Provider value={todoList}>
      <DispatchContext.Provider
        value={{ toggleDone, onCreate, onRemove, onEdit, forceUpdate }}
      >
        <BrowserRouter>
          <div className="App">
            <Sidebar />
            <div className="Main">
              <Header
                curDate={curDate}
                increase={increaseMonth}
                decrease={decreaseMonth}
              />
              <Calendar curDate={curDate} />
            </div>
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </TodoListContext.Provider>
  );
}

export default App;
