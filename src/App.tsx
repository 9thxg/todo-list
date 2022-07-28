import { useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
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
        <div className="Main">
          <Header
            date={date}
            increase={increaseMonth}
            decrease={decreaseMonth}
          />
          <Calendar date={date} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
