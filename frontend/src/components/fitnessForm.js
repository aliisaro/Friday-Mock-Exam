import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FitnessForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const fitness = { title, date, caloriesBurned, duration };

    const response = await fetch("/api/fitness", {
      method: "POST",
      body: JSON.stringify(fitness),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      navigate("/login");
    }
    if (response.ok) {
      setTitle("");
      setDuration("");
      setCaloriesBurned("");
      setDate("");
      setError(null);
      navigate("/login");
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Fitness Data</h3>
      <label>Title:</label>
      <input type="text"onChange={(e) => setTitle(e.target.value)}value={title}/>
      <label>Date:</label>
      <input type="date"onChange={(e) => setDate(e.target.value)}value={date}/>
      <label>Calories Burned:</label>
      <input type="number"onChange={(e) => setCaloriesBurned(e.target.value)}value={caloriesBurned}/>
      <label>Duration:</label>
      <input type="number"onChange={(e) => setDuration(e.target.value)}value={duration}/>
      <button>Add Fitness</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default FitnessForm;
