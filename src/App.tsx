import { useEffect, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Calendar from "./pages/Calendar";

export interface Data {
  id: number;
  date: number;
  content: string;
  isDone: boolean;
}

const dummy: Data[] = [
  {
    id: 1,
    date: 1658934000000,
    content: "work",
    isDone: true,
  },
  {
    id: 2,
    date: 1658934000000,
    content: "exercise",
    isDone: false,
  },
  {
    id: 3,
    date: 1659085018082,
    content: "work",
    isDone: false,
  },
  {
    id: 4,
    date: 1659085018082,
    content: "meeting",
    isDone: false,
  },
  {
    id: 5,
    date: 1659106800000,
    content: "work",
    isDone: true,
  },
  {
    id: 6,
    date: 1659106800000,
    content: "hang out",
    isDone: false,
  },
  {
    id: 7,
    date: 1659085018082,
    content: "이걸",
    isDone: true,
  },
  {
    id: 8,
    date: 1659085018082,
    content: "뚫고 지나갈려나",
    isDone: true,
  },
  {
    id: 9,
    date: 1659085018082,
    content: "단지 궁금할 뿐",
    isDone: true,
  },
];

function App() {
  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState(dummy);
  const [todoList, setTodoList] = useState(data);

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
    setTodoList(data.filter((it) => firstDay <= it.date && it.date <= lastDay));
  }, [curDate, data, todoList]);

  const switchDone = (targetId: number) => {
    const todo = data.find((it) => targetId === it.id);
    const doneTodo = { ...todo!, isDone: true };
    const newData = data.map((it) =>
      targetId === it.id ? { ...doneTodo } : it
    );
    setData(newData);
    console.log(doneTodo);
    console.log(data);
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
