import React from "react";
import { useAthletes } from "../context/AthleteContext";
import AthleteCard from "./AthleteCard";

const AthleteList = () => {
  const { athletes, loading } = useAthletes();

  if (loading) return <p>Ladataan urheilijoita...</p>;

  return (
    <div>
      <h2>Urheilijat</h2>
      {athletes.length === 0 ? (
        <p>Ei urheilijoita tietokannassa</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {athletes.map((a) => (
            <AthleteCard key={a.id} athlete={a} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AthleteList;
