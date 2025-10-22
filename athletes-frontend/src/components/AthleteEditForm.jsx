import React, { useState, useEffect } from "react";
import { useAthletes } from "../context/AthleteContext";

const AthleteEditForm = ({ athlete, onCancel }) => {
  const { editAthlete } = useAthletes();
  const [form, setForm] = useState(null); // alussa ei vielä tietoja

  // Kun athlete saapuu propseina, päivitetään lomaketila
  useEffect(() => {
    if (athlete) {
      setForm({
        ...athlete,
        birth_date: athlete.birth_date
          ? new Date(athlete.birth_date).toISOString().split("T")[0]
          : "",
      });
    }
  }, [athlete]);

  if (!form) {
    return <p>Ladataan tietoja...</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editAthlete(form.id, form);
    onCancel(); // sulje muokkaus
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid #ccc", padding: 10, borderRadius: 8 }}
    >
      <h4>Muokkaa urheilijaa</h4>
      <input
        name="first_name"
        value={form.first_name || ""}
        onChange={handleChange}
      />
      <input
        name="last_name"
        value={form.last_name || ""}
        onChange={handleChange}
      />
      <input
        name="nickname"
        value={form.nickname || ""}
        onChange={handleChange}
      />
      <input
        type="date"
        name="birth_date"
        value={form.birth_date || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="weight"
        value={form.weight || ""}
        onChange={handleChange}
      />
      <input
        name="image_url"
        value={form.image_url || ""}
        onChange={handleChange}
      />
      <input name="sport" value={form.sport || ""} onChange={handleChange} />
      <textarea
        name="achievements"
        value={form.achievements || ""}
        onChange={handleChange}
      />
      <div style={{ marginTop: 10 }}>
        <button type="submit">Tallenna</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
          Peruuta
        </button>
      </div>
    </form>
  );
};

export default AthleteEditForm;
