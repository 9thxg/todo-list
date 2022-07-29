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
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(dummy);

  useEffect(() => {
    console.log(date.getTime());
    console.log(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      ).getTime()
    );
    console.log(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1
      ).getTime()
    );
  });

  const increaseMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };

  const decreaseMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <div className="Main">
          <Header
            date={date}
            increase={increaseMonth}
            decrease={decreaseMonth}
          />
          <Calendar date={date} datas={data} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
