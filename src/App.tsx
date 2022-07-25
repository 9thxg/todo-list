import { useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Calendar from "./pages/Calendar";

function App() {
  const [date, setDate] = useState(new Date());

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
        <div>
          <div className="Header">
            <button onClick={decreaseMonth}>{"<"}</button>
            <div>{`${date.getFullYear()}년 ${date.getMonth() + 1}`}월</div>
            <button onClick={increaseMonth}>{">"}</button>
          </div>
          <Calendar date={date} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
