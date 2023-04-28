import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import './Booking.css'

function Booking() {
  const { auth, bookingApi } = useAuth();
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    bookingApi(auth.userName)
      .then((data) => {
        const formattedData = data.map((item) => {
          const date = new Date(item.date);
          const formattedDate = date.toISOString().slice(0, 10);
          const startTime = new Date(item.startTime);
          const formattedStartTime = startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          const endTime = new Date(item.endTime);
          const formattedEndTime = endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          return {
            ...item,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          };
        });
        setBookingData(formattedData || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.userName, bookingApi]);

  const editBooking = () => {
    console.log('edit')
  }

  const deleteBooking = () => {
    console.log('delete')
  }

  return (
    <div className='bookingContainer'>
        <h1 className='page-title'>Bokningar</h1>
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
        {bookingData.map((item) => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.startTime}</td>
            <td>{item.endTime}</td>
            <td>{item.note}</td>
            <td>{item.place}</td>
            <td><button className='yellowBtn bookingBtn' onClick={editBooking}>Föreslå ändring</button></td>
            <td><button className='redBtn bookingBtn' onClick={deleteBooking}>Lämna återbud</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Booking;