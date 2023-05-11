import { useNavigate } from "react-router-dom";

function FreeTimeItem({ item, handleDeleteFreeTime }) {
  const navigate = useNavigate();

  const editFreetime = () => {
    navigate(`/editFreeTime/${item.freeTimeId}`);
  };

  const deleteFreetime = () => {
    handleDeleteFreeTime(item.freeTimeId);
  };

  return (
    <tr key={item.freeTimeId}>
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
  );
}

export default FreeTimeItem;
