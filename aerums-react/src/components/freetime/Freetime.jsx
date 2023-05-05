import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Freetime.css";

function Freetime() {
  const navigate = useNavigate();
  const { auth, freeTimeApi } = useAuth();
  const [freetimeData, setFreetimeData] = useState([]);

  useEffect(() => {
    freeTimeApi(auth.userName)
      .then((data) => {
        const formattedData = data.map((item) => {
          const date = new Date(item.date);
          const formattedDate = date.toISOString().slice(0, 10);
          const startTime = new Date(item.startTime);
          const formattedStartTime = startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const endTime = new Date(item.endTime);
          const formattedEndTime = endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return {
            ...item,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          };
        });
        setFreetimeData(formattedData || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.userName, freeTimeApi]);

  const editFreetime = () => {
    console.log("edit");
  };

  const deleteFreetime = () => {
    console.log("delete");
  };

  const addFreeTimeClickHandler = () => {
    navigate("/addFreeTime");
  };

  return (
    <div className="freetimeContainer">
      <h1 className="page-title">Lediga Tider</h1>
      <div className="addMyFreeTimeDiv">
        <button className="btn" onClick={addFreeTimeClickHandler}>
          Lägg till tid för att ses
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Notes</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {freetimeData.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.startTime}</td>
              <td>{item.endTime}</td>
              <td>{item.note}</td>
              <td>{item.place}</td>
              <td>
                <button className="yellowBtn" onClick={editFreetime}>
                  Ändra
                </button>
              </td>
              <td>
                <button className="redBtn" onClick={deleteFreetime}>
                  Radera
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Freetime;
