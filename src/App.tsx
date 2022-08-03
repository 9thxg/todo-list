import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Calendar from "./pages/Calendar";
import dummyData from "./dummyData.json";

type Action_type = "INIT" | "EDIT";

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
}

const reducer = (state: Data[], action: Action): Data[] => {
  let newState: Data[] = [];
  switch (action.type) {
    case "INIT": {
      return action.todoList!;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.todo!.id ? { ...action.todo! } : it
      );
      break;
    }
  }
  return newState;
};

function App() {
  const [todoData, dispatch] = useReducer(reducer, []);

  const [curDate, setCurDate] = useState(new Date());
  const [todoList, setTodoList] = useState(todoData);

  useEffect(() => {
    dispatch({ type: "INIT", todoList: dummyData });
  }, []);

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
  }, [curDate, todoData]);

  const switchDone = (targetId: number) => {
    const todo = todoData.find((it) => targetId === it.id);
    const doneTodo = { ...todo!, isDone: true };
    dispatch({ type: "EDIT", todo: doneTodo });
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
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <div className="Main">
          <Header
            curDate={curDate}
            increase={increaseMonth}
            decrease={decreaseMonth}
          />
          <Calendar
            curDate={curDate}
            todoList={todoList}
            switchDone={switchDone}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
