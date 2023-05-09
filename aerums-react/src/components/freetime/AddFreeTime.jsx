import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import "./Freetime.css";

function AddFreeTime() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [place, setPlace] = useState("");
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const { addFreeTimeApi } = useAuth();

  const handleChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const handleChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };
  const handleTextChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleTextChangePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleSaveFreeTime = (e) => {
    const date = `${selectedDay}/${selectedMonth}/${selectedYear}`;
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
  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
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
            <div className="form-control">
              <label className="date" htmlFor="date">
                Datum:
              </label>
              <div name="date" id="date">
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

            <div className="form-control">
              <label className="startTime" htmlFor="startTime">
                Start Tid
              </label>
              <input
                onChange={handleChangeStartTime}
                value={startTime}
                type="text"
                id="startTime"
                name="startTime"
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label className="endTime" htmlFor="endTime">
                Slut Tid
              </label>
              <input
                onChange={handleChangeEndTime}
                value={endTime}
                type="text"
                id="endTime"
                name="endTime"
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label className="note" htmlFor="note">
                Notis
              </label>
              <input
                onChange={handleTextChangeNote}
                value={note}
                type="text"
                id="note"
                name="note"
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label className="place" htmlFor="place">
                Plats
              </label>
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
