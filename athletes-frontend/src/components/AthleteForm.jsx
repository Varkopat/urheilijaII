import { useState } from "react";
import { useAthletes } from "../context/AthleteContext";

export default function AthleteForm() {
  const { createAthlete } = useAthletes();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    nickname: "",
    birth_date: "",
    weight: "",
    sport: "",
    image_url: "",
    achievements: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await createAthlete(form);
    setForm({
      first_name: "",
      last_name: "",
      nickname: "",
      birth_date: "",
      weight: "",
      sport: "",
      image_url: "",
      achievements: "",
    });
  };

  return (
    <form onSubmit={onSubmit} className="card p-4 mb-5">
      <h5 className="text-primary mb-3">Lisää uusi urheilija</h5>

      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <input
            name="first_name"
            value={form.first_name}
            onChange={onChange}
            className="form-control"
            placeholder="Etunimi"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            name="last_name"
            value={form.last_name}
            onChange={onChange}
            className="form-control"
            placeholder="Sukunimi"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            name="nickname"
            value={form.nickname}
            onChange={onChange}
            className="form-control"
            placeholder="Kutsumanimi"
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <input
            name="weight"
            value={form.weight}
            onChange={onChange}
            className="form-control"
            placeholder="Paino (kg)"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            name="sport"
            value={form.sport}
            onChange={onChange}
            className="form-control"
            placeholder="Laji"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            name="image_url"
            value={form.image_url}
            onChange={onChange}
            className="form-control"
            placeholder="Kuvan URL"
          />
        </div>
      </div>

      <div className="mb-3">
        <textarea
          name="achievements"
          value={form.achievements}
          onChange={onChange}
          className="form-control"
          placeholder="Saavutukset"
          rows="3"
        />
      </div>

      <div className="text-end">
        <button className="btn btn-primary px-4">Tallenna urheilija</button>
      </div>
    </form>
  );
}
