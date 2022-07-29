import { useEffect, useState } from "react";
import { Data } from "../App";
import Block from "../components/Block";

const Calendar = ({ date, datas }: { date: Date; datas: Data[] }) => {
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [range, setRange] = useState({ first: date, last: date });

  useEffect(() => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    setRange({ first: firstDay, last: lastDay });
  }, [date]);

  function makeBox() {
    const boxs = [];
    for (let i = 0; i < range.first.getDay(); i++) {
      boxs.push(<Block key={i + 32} />);
    }
    for (let i = range.first.getDate(); i < range.last.getDate() + 1; i++) {
      const todolist = datas.filter((it) => new Date(it.date).getDate() === i);
      boxs.push(<Block key={i} date={i} datas={todolist} />);
    }
    return boxs;
  }

  return (
    <div className="Calendar">
      <div className="DayOfWeek">
        {dayOfWeek.map((it) => (
          <div key={it} className="Day">
            {it}
          </div>
        ))}
      </div>

      <div className="GridContainer">{makeBox()}</div>
    </div>
  );
};

export default Calendar;
