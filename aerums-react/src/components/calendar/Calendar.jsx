import React, { useState, useEffect } from 'react';
import './Calendar.css';
import useAuth from "../hooks/useAuth"

function Calendar() {
  const [date, setDate] = useState(new Date());
  const {auth, freeTimeApi} = useAuth();
 
  freeTimeApi(auth.userName)
  .then((data) => {
    const freetimeData = data || [];
    console.log(freetimeData)
  })
  .catch((error) => {
    console.error(error)
  });

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const monthNames = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  const daysOfWeek = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  // In Sweden, the week starts on Monday, so we need to shift the day indices
  const daysOfWeekSwedish = [...daysOfWeek.slice(1), daysOfWeek[0]];

  const weeksInMonth = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

  const weeks = [];
  let day = 1;
  for (let i = 0; i < weeksInMonth; i++) {
    const days = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfWeek - 1) {
        days.push(<td key={j}></td>);
      } else if (day > daysInMonth) {
        days.push(<td key={j}></td>);
      } else {
        const currentDate = new Date(date);
        currentDate.setDate(day);
        days.push(
          <td key={j} className="day">
            {day}
          </td>
        );
        day++;
      }
    }
    weeks.push(<tr key={i}>{days}</tr>);
  }

  return (
    <>
    <div className='calendarContainer'>
      <h1 className='page-title'>Kalender</h1>
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            {daysOfWeekSwedish.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    </div>
    </div>
    
    </>
  );
}

export default Calendar;


