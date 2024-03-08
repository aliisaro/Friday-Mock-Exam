// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";


const fitnessDelete = (id) => {
  const data = fetch(`/api/fitness/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const FitnessDetails = () => {
  const response = fetch("/api/fitness", {
    method: "GET",
    body: JSON.stringify(response),
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return (
    <div className="fitness-details">
      <h4>{response.title}</h4>
      <p>{formatDistanceToNow(new Date(response.date), { addSuffix: true })}</p>
      <p>Duration: {response.duration}</p>
      <p>Calories Burned: {response.caloriesBurned}</p>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          fitnessDelete(response._id);
        }}
      >
        delete
      </span>
    </div>
  );
};

export default FitnessDetails;

/*
const FitnessDetails = ({ fitness }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fitness = { title, date, caloriesBurned, duration };
    console.log("Fitness is empty", fitness);

    const response = await fetch("/api/fitness", {
      method: "GET",
      body: JSON.stringify(fitness),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `+ token,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    };
    if (response.ok) {
      setTitle(title);
      setDuration(date);
      setCaloriesBurned(caloriesBurned);
      setDate(duration);
      setError(null);
    };
  };

  return (
    <div className="fitness-details">
      <h4>Title:{title}</h4>

      <p>Duration: {duration}</p>
      <p>Calories Burned: {caloriesBurned}</p>

    </div>
  );
};
export default FitnessDetails;*/