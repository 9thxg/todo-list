import { useEffect, useState } from "react";
import { Data } from "../App";
import Block from "../components/Block";

const Calendar = ({
  curDate,
  todoList,
}: {
  curDate: Date;
  todoList: Data[];
}) => {
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [range, setRange] = useState({ first: curDate, last: curDate });

  useEffect(() => {
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    setRange({ first: firstDay, last: lastDay });
  }, [curDate]);

  function makeBox() {
    const boxs = [];
    for (let i = 0; i < range.first.getDay(); i++) {
      boxs.push(<Block key={i + 32} />);
    }
    for (let i = range.first.getDate(); i < range.last.getDate() + 1; i++) {
      const todos = todoList.filter((it) => new Date(it.date).getDate() === i);
      boxs.push(<Block key={i} date={i} todos={todos} />);
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
