import React, { useState } from "react";
import { useAthletes } from "../context/AthleteContext";
import AthleteEditForm from "./AthleteEditForm";
import { formatDate } from "../utils/formatDate";

const AthleteCard = ({ athlete }) => {
  const { removeAthlete } = useAthletes();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <AthleteEditForm athlete={athlete} onCancel={() => setIsEditing(false)} />
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 10,
        width: 240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={athlete.image_url}
        alt={athlete.first_name}
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
      <h3>
        {athlete.first_name} {athlete.last_name}
      </h3>
      <p>
        <b>Laji:</b> {athlete.sport}
      </p>
      <p>
        <b>Paino:</b> {athlete.weight} kg
      </p>
      <p>
        <b>Syntynyt:</b> {formatDate(athlete.birth_date)}
      </p>
      <p>
        <b>Saavutukset:</b> {athlete.achievements}
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setIsEditing(true)}>Muokkaa</button>
        <button onClick={() => removeAthlete(athlete.id)}>Poista</button>
      </div>
    </div>
  );
};

export default AthleteCard;
