import FitnessForm from "../components/fitnessForm";
import FitnessDetails from "../components/FitnessDetails";
import { useEffect, useState} from "react";
const Home = () => {
  const [fitnessArray, setFitnessArray] = useState([]);
  useEffect(() => {
    const getFitness = async () => {
    const response = await fetch("/api/fitness",{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
      setFitnessArray([]);
      return;
    }
    setFitnessArray(data);
  }
  getFitness()

  },[])
  return (
    <div className="home">
      <div className="fitness">
        {fitnessArray.length === 0 && <h2>No Fitness Goals Found </h2>}
        {fitnessArray.map((fitness) => (
          <FitnessDetails key={fitness._id} fitness={fitness} />
        ))}
      </div>
      <FitnessForm />
    </div>
  );
};
export default Home;