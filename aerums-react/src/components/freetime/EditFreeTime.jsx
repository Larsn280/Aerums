import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function EditFreeTime() {
  const params = useParams();
  const { getFreeTimeApi } = useAuth();

  useEffect(() => {
    fetchFreeTime(params.id);
  }, [params.id]);

  const fetchFreeTime = async (id) => {
    try {
      const data = await getFreeTimeApi(id);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return <h1>{params.id}</h1>;
}

export default EditFreeTime;
