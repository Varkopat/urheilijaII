import { useState, useEffect } from "react";
import { useAthletes } from "../context/AthleteContext";

export default function AthleteList() {
  const { athletes, deleteAthlete, updateAthlete, loading } = useAthletes();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (editId) {
      const athlete = athletes.find((a) => a.id === editId);
      setForm(athlete || {});
    }
  }, [editId, athletes]);

  // Suodatus hakusanan perusteella (etunimi, sukunimi, laji)
  const filteredAthletes = athletes.filter(
    (a) =>
      a.first_name.toLowerCase().includes(search.toLowerCase()) ||
      a.last_name.toLowerCase().includes(search.toLowerCase()) ||
      a.sport.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Ladataan...</p>;
  if (!athletes.length)
    return <p className="text-muted">Ei urheilijoita tietokannassa.</p>;

  const startEdit = (athlete) => {
    setEditId(athlete.id);
    setForm(athlete);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
  };

  const saveEdit = async () => {
    await updateAthlete(editId, form);
    setEditId(null);
    setForm({});
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "weight" ? parseFloat(value) || "" : value,
    });
  };

  return (
    <>
      {/* Hakukenttä */}
      <div className="mb-4 text-end">
        <input
          type="text"
          placeholder="Hae urheilijaa..."
          className="form-control w-50 d-inline"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredAthletes.map((a) => (
          <div className="col-md-6 col-lg-4" key={a.id}>
            <div className="card h-100 shadow-sm">
              {a.image_url && (
                <img
                  src={a.image_url}
                  alt={a.first_name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                {editId === a.id ? (
                  <>
                    <input
                      name="first_name"
                      value={form.first_name}
                      onChange={onChange}
                      className="form-control mb-2"
                      placeholder="Etunimi"
                    />
                    <input
                      name="last_name"
                      value={form.last_name}
                      onChange={onChange}
                      className="form-control mb-2"
                      placeholder="Sukunimi"
                    />
                    <input
                      name="nickname"
                      value={form.nickname || ""}
                      onChange={onChange}
                      className="form-control mb-2"
                      placeholder="Kutsumanimi"
                    />
                    <input
                      type="date"
                      name="birth_date"
                      value={
                        form.birth_date ? form.birth_date.substring(0, 10) : ""
                      }
                      onChange={onChange}
                      className="form-control mb-2"
                    />
                    <input
                      name="sport"
                      value={form.sport}
                      onChange={onChange}
                      className="form-control mb-2"
                      placeholder="Laji"
                    />
                    <input
                      name="weight"
                      value={form.weight}
                      onChange={onChange}
                      className="form-control mb-2"
                      placeholder="Paino (kg)"
                    />

                    <input
                      name="image_url"
                      value={form.image_url || ""}
                      onChange={onChange}
                      className="form-control mb-2"
                      placeholder="Kuvan URL"
                    />

                    <textarea
                      name="achievements"
                      value={form.achievements}
                      onChange={onChange}
                      className="form-control mb-2"
                      rows="2"
                      placeholder="Saavutukset"
                    />
                  </>
                ) : (
                  <>
                    <h5 className="card-title mb-1">
                      {a.first_name} {a.last_name}
                    </h5>
                    <p className="text-muted mb-2">{a.sport}</p>

                    {a.nickname && (
                      <p className="small mb-1">
                        <strong>Kutsumanimi:</strong> {a.nickname}
                      </p>
                    )}

                    <p className="small mb-1">
                      <strong>Syntymäaika:</strong>{" "}
                      {new Date(a.birth_date).toLocaleDateString("fi-FI")}
                    </p>

                    <p className="small mb-1">
                      <strong>Paino:</strong> {a.weight} kg
                    </p>

                    <p className="small mb-2">
                      <strong>Saavutukset:</strong> {a.achievements}
                    </p>
                  </>
                )}
              </div>
              <div className="card-footer bg-transparent border-0 text-end">
                {editId === a.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={saveEdit}
                    >
                      Tallenna
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={cancelEdit}
                    >
                      Peruuta
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-primary gap-2"
                      onClick={() => startEdit(a)}
                    >
                      Muokkaa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteAthlete(a.id)}
                    >
                      Poista
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
