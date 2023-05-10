import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FreeTimeItem from "./FreeTimeItem";
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
          const formattedDate = date.toLocaleDateString("sv-SE").slice(0, 10);
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
  }, [auth.userName, freeTimeApi, freetimeData]);

  const addFreeTimeClickHandler = () => {
    navigate("/addFreeTime");
  };

  return (
    <div className="freetimeContainer">
      <h1 className="page-title">Lediga Tider</h1>
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
            <FreeTimeItem item={item} key={item.freeTimeId} />
          ))}
        </tbody>
      </table>
      <div className="addMyFreeTimeDiv">
        <button onClick={addFreeTimeClickHandler}>Lägg till tid</button>
      </div>
    </div>
  );
}

export default Freetime;
