import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const fitnessDelete = (id) => {
  const data = fetch(`/api/fitness/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const FitnessDetails = ({ fitness }) => {
  const navigate = useNavigate();

  return (
    <div className="fitness-details">
      <h4>{fitness.title}</h4>
      <p>{formatDistanceToNow(new Date(fitness.date), { addSuffix: true })}</p>
      <p>Duration: {fitness.duration}</p>
      <p>Calories Burned: {fitness.caloriesBurned}</p>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          fitnessDelete(fitness._id);
          navigate("/");
        }}
      >
        delete
      </span>
    </div>
  );
};

export default FitnessDetails;
