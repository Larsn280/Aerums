import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import "./Freetime.css";

function AddFreeTime() {
  const [note, setNote] = useState("");
  const [place, setPlace] = useState("");
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedHourOne, setSelectedHourOne] = useState("");
  const [selectedMinuteOne, setSelectedMinuteOne] = useState("");
  const [selectedHourTwo, setSelectedHourTwo] = useState("");
  const [selectedMinuteTwo, setSelectedMinuteTwo] = useState("");
  const { addFreeTimeApi } = useAuth();

  const handleTextChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleTextChangePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleSaveFreeTime = (e) => {
    const date = `${selectedDay}/${selectedMonth}/${selectedYear}`;
    const startTime = `${selectedHourOne}:${selectedMinuteOne}`;
    const endTime = `${selectedHourTwo}:${selectedMinuteTwo}`;
    e.preventDefault();
    const freeTime = {
      date,
      startTime,
      endTime,
      note,
      place,
    };

    addFreeTimeApi(freeTime);
  };

  const months = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const monthIndex = months.indexOf(selectedMonth);
      const daysInMonth = getDaysInMonth(monthIndex + 1, selectedYear);
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from(
      { length: 10 },
      (_, index) => currentYear + index
    );
    setYears(yearRange);
  }, []);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };
  const handleHourChangeOne = (e) => {
    setSelectedHourOne(e.target.value);
  };

  const handleMinuteChangeOne = (e) => {
    setSelectedMinuteOne(e.target.value);
  };
  const handleHourChangeTwo = (e) => {
    setSelectedHourTwo(e.target.value);
  };

  const handleMinuteChangeTwo = (e) => {
    setSelectedMinuteTwo(e.target.value);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const consolelog = () => {
    console.log(days);
  };

  return (
    <>
      <button onClick={consolelog}></button>
      <h1 className="page-title">Lägg till ledig tid</h1>
      <section className="form-container">
        <h4>Ledig Tid</h4>
        <section className="form-wrapper">
          <form className="form" onSubmit={handleSaveFreeTime}>
            <label className="date" htmlFor="date">
              Datum:
            </label>
            <div className="form-control">
              <div name="date" id="date" className="addFreeTimeInputField">
                <select
                  name="day"
                  id="day"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  <option value="">Dag</option>
                  {days.map((day, index) => (
                    <option key={index} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                <select
                  name="month"
                  id="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  <option value="">Månad</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  name="year"
                  id="year"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  <option value="">År</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="startTime" htmlFor="startTime">
              Start Tid:
            </label>
            <div className="form-control">
              <div className="addFreeTimeInputField">
                <select value={selectedHourOne} onChange={handleHourChangeOne}>
                  <option value="">Hour</option>
                  {/* Add hour options from 0 to 23 */}
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMinuteOne}
                  onChange={handleMinuteChangeOne}
                >
                  <option value="">Minute</option>
                  {/* Add minute options from 0 to 59 */}
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="endTime" htmlFor="endTime">
              Slut Tid:
            </label>
            <div className="form-control">
              <div className="addFreeTimeInputField">
                <select value={selectedHourTwo} onChange={handleHourChangeTwo}>
                  <option value="">Hour</option>
                  {/* Add hour options from 0 to 23 */}
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMinuteTwo}
                  onChange={handleMinuteChangeTwo}
                >
                  <option value="">Minute</option>
                  {/* Add minute options from 0 to 59 */}
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="note" htmlFor="note">
              Notis:
            </label>
            <div className="form-control">
              <input
                onChange={handleTextChangeNote}
                value={note}
                type="text"
                id="note"
                name="note"
                autoComplete="off"
              />
            </div>

            <label className="place" htmlFor="place">
              Plats:
            </label>
            <div className="form-control">
              <input
                onChange={handleTextChangePlace}
                value={place}
                type="text"
                id="place"
                name="place"
                autoComplete="off"
              />
            </div>

            <div className="buttons">
              <button type="submit" className="btn">
                Spara
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default AddFreeTime;
