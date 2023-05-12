import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function EditFreeTime() {
  const params = useParams();
  const navigate = useNavigate();
  const { auth, getFreeTimeApi, editFreeTimeApi } = useAuth();
  const [id, setId] = useState();
  const [note, setNote] = useState();
  const [place, setPlace] = useState();
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedHourOne, setSelectedHourOne] = useState("");
  const [selectedMinuteOne, setSelectedMinuteOne] = useState("");
  const [selectedHourTwo, setSelectedHourTwo] = useState("");
  const [selectedMinuteTwo, setSelectedMinuteTwo] = useState("");

  useEffect(() => {
    fetchFreeTime(params.id);
  }, [params.id]);

  const handleTextChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleTextChangePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleEditFreeTime = async (e) => {
    const date = `${selectedDay}/${selectedMonth}/${selectedYear}`;
    const startTime = `${formatNumber(selectedHourOne)}:${formatNumber(
      selectedMinuteOne
    )}`;
    const endTime = `${formatNumber(selectedHourTwo)}:${formatNumber(
      selectedMinuteTwo
    )}`;
    const userName = auth.userName;
    e.preventDefault();
    const editedFreeTime = {
      id,
      date,
      startTime,
      endTime,
      note,
      place,
      userName,
    };

    await editFreeTimeApi(editedFreeTime)
      .then(() => {
        navigate("/freetime");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchFreeTime = async (id) => {
    try {
      const response = await getFreeTimeApi(id);

      if (!response) {
        console.log("Kund int fin andar eld så gik ir fel");
      }

      setId(response.freeTimeId);
      setNote(response.note);
      setPlace(response.place);
      const dateArray = response.date.split("-");
      setSelectedDay(checkSubstring(dateArray[0]));
      setSelectedMonth(
        dateArray[1].charAt(0).toUpperCase() + dateArray[1].slice(1)
      );
      setSelectedYear(dateArray[2]);
      const startTimeArray = response.startTime.split(":");
      setSelectedHourOne(checkSubstring(startTimeArray[0]));
      setSelectedMinuteOne(checkSubstring(startTimeArray[1]));
      const endTimeArray = response.endTime.split(":");
      setSelectedHourTwo(checkSubstring(endTimeArray[0]));
      setSelectedMinuteTwo(checkSubstring(endTimeArray[1]));
    } catch (error) {
      console.error(error);
    }
  };

  const checkSubstring = (substring) => {
    const splited = substring.split("0");
    console.log(splited);
    if (splited.length === 3) {
      return 0;
    }
    if (splited.length === 2) {
      return splited[1];
    }
    if (splited.length === 1) {
      return splited[0];
    }
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

  const formatNumber = (number) => {
    return number < 10 ? "0" + number : number;
  };

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

  return (
    <>
      <h1 className="page-title">Ändra tid</h1>

      <section className="form-container">
        <h4>Ledig Tid</h4>

        <section className="form-wrapper">
          <form className="form" onSubmit={handleEditFreeTime}>
            <label className="addFreeTimeLable">Datum:</label>
            <div className="form-control">
              <div className="addFreeTimeInputField">
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

            <label className="addFreeTimeLable">Start Tid:</label>
            <div className="form-control">
              <div className="addFreeTimeInputField">
                <select
                  id="hour"
                  value={selectedHourOne}
                  onChange={handleHourChangeOne}
                >
                  <option value="">Hour</option>
                  {/* Add hour options from 0 to 23 */}
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <option key={hour} value={hour}>
                      {formatNumber(hour)}
                    </option>
                  ))}
                </select>
                <select
                  id="minute"
                  value={selectedMinuteOne}
                  onChange={handleMinuteChangeOne}
                >
                  <option value="">Minute</option>
                  {/* Add minute options from 0 to 59 */}
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute}>
                      {formatNumber(minute)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="addFreeTimeLable">Slut Tid:</label>
            <div className="form-control">
              <div className="addFreeTimeInputField">
                <select
                  id="hour"
                  value={selectedHourTwo}
                  onChange={handleHourChangeTwo}
                >
                  <option value="">Hour</option>
                  {/* Add hour options from 0 to 23 */}
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <option key={hour} value={hour}>
                      {formatNumber(hour)}
                    </option>
                  ))}
                </select>
                <select
                  id="minute"
                  value={selectedMinuteTwo}
                  onChange={handleMinuteChangeTwo}
                >
                  <option value="">Minute</option>
                  {/* Add minute options from 0 to 59 */}
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute}>
                      {formatNumber(minute)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="addFreeTimeLable">Notis:</label>
            <div className="form-control">
              <textarea
                onChange={handleTextChangeNote}
                value={note}
                type="text"
                id="note"
                name="note"
                autoComplete="off"
                rows={2}
              />
            </div>

            <label className="addFreeTimeLable">Plats:</label>
            <div className="form-control">
              <textarea
                onChange={handleTextChangePlace}
                value={place}
                type="text"
                id="place"
                name="place"
                autoComplete="off"
                rows={2}
              />
            </div>

            <div className="submitFreeTimeDiv">
              <button type="submit">Spara</button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default EditFreeTime;
