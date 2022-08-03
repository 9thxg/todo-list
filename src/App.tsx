import React, { useEffect, useReducer, useState, createContext } from "react";
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

export const TodoListContext = createContext<Data[] | undefined>(undefined);

export const DispatchContext = createContext<{} | undefined>(undefined);

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

  const onToggle = (targetId: number) => {
    const todo = todoData.find((it) => targetId === it.id);
    const doneTodo = { ...todo!, isDone: !todo!.isDone };
    dispatch({ type: "EDIT", todo: doneTodo });
    console.log(todoData);
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
      <DispatchContext.Provider value={{ onToggle }}>
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
