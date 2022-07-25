import { useEffect, useState } from "react";

const Calendar = ({ date }: { date: Date }) => {
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [range, setRange] = useState({ first: 0, last: 0 });

  useEffect(() => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getDate();
    setRange({ first: firstDay, last: lastDay });
    console.log(firstDay, lastDay);
    console.log(range);
  }, [date]);

  function makeBox() {
    const boxs = [];
    for (let i = range.first; i < range.last + 1; i++) {
      boxs.push(<div>{i}</div>);
    }
    return boxs;
  }

  return (
    <div className="Calendar">
      <div className="DayOfWeek">
        {dayOfWeek.map((it) => (
          <div>{it}</div>
        ))}
      </div>

      <div>{makeBox()}</div>
    </div>
  );
};

export default Calendar;
