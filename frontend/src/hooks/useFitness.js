import { useState } from "react";

export const useFitness = ({ title, date, caloriesBurned, duration }) => {
    const fitness = useState([]);
    const apiUrl = "api/fitness";
    const token = sessionStorage.getItem("token");
    const handleFitness = async (error) => {
        error.preventDefault();
        console.log(error);
        try{
            const newFitness = {
                title,
                date,
                caloriesBurned,
                duration
            };
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ` + token
                },
            });

            const date = await response.json();
            console.log(response, newFitness);
            if(response.ok){
                setFitnessData((prevFitness)=> [data, ...prevFitness]);
            };
        }catch(error){
            console.log(error);
        };
    };
    return {fitness, handleFitness};
};