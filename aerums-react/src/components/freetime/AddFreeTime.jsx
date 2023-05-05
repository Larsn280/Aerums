import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "./Freetime.css";

function AddFreeTime() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [place, setPlace] = useState("");
  const { addFreeTimeApi } = useAuth();

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };
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
    e.preventDefault();
    const freeTime = {
      date,
      startTime,
      endTime,
      note,
      place,
    };

    addFreeTimeApi(freeTime);
    console.log(addFreeTimeApi);
  };

  return (
    <>
      <h1 className="page-title">Lägg till ledig tid</h1>
      <section className="form-container">
        <h4>Ledig Tid</h4>
        <section className="form-wrapper">
          <form className="form" onSubmit={handleSaveFreeTime}>
            <div className="form-control">
              <label className="date" htmlFor="date">
                Datum
              </label>
              <input
                onChange={handleChangeDate}
                value={date}
                type="text"
                id="date"
                name="date"
                autoComplete="off"
              />
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
