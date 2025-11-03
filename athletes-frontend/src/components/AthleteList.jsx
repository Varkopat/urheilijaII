import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Row, Col } from "react-bootstrap";
import { useAthletes } from "../context/AthleteContext";
import AthleteEditModal from "./AthleteEditModal";
import { toast } from "react-toastify";

const AthleteList = () => {
  const { athletes, loading, deleteAthlete, fetchAthletes } = useAthletes();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  // 🔄 Lataa urheilijat heti käynnistyksessä
  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  // ✏️ Avaa muokkausikkuna
  const openEditModal = (athlete) => {
    setSelectedAthlete(athlete);
    setShowModal(true);
  };

  // ❌ Sulje modal
  const closeEditModal = () => {
    setShowModal(false);
    setSelectedAthlete(null);
  };

  // 🗑️ Poista urheilija + ilmoitus
  const handleDelete = async (id) => {
    if (window.confirm("Haluatko varmasti poistaa tämän urheilijan?")) {
      try {
        await deleteAthlete(id);
        await fetchAthletes(); // päivitä lista heti
        toast.success("Urheilija poistettu onnistuneesti 🗑️");
      } catch (error) {
        console.error(error);
        toast.error(
          "Virhe poistettaessa urheilijaa. Tarkista yhteys palvelimeen."
        );
      }
    }
  };

  // 🔍 Suodatus
  const filteredAthletes = athletes.filter(
    (a) =>
      a.first_name.toLowerCase().includes(search.toLowerCase()) ||
      a.last_name.toLowerCase().includes(search.toLowerCase()) ||
      a.sport.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Ladataan urheilijoita...</p>
      </div>
    );
  }

  return (
    <div>
      {/* 🔍 Hakukenttä */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Hae urheilijaa nimellä tai lajilla..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧱 Urheilijakortit gridissä */}
      {filteredAthletes.length === 0 ? (
        <p>Ei urheilijoita löytynyt.</p>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {filteredAthletes.map((a) => (
            <Col key={a.id}>
              <Card
                className="shadow-sm h-100 hover-card"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    {a.image_url ? (
                      <img
                        src={a.image_url}
                        alt={a.nickname}
                        style={{
                          width: 90,
                          height: 90,
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginRight: 15,
                          border: "2px solid #dee2e6",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          backgroundColor: "#e9ecef",
                          marginRight: 15,
                        }}
                      ></div>
                    )}
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <h5 className="mb-1">
                        {a.first_name} {a.last_name}{" "}
                        {a.nickname && (
                          <span className="text-muted">({a.nickname})</span>
                        )}
                      </h5>
                      <p className="mb-1">
                        <strong>Laji:</strong> {a.sport}
                      </p>
                      <p className="mb-1">
                        <strong>Paino:</strong> {a.weight} kg
                      </p>
                      {a.birth_date && (
                        <p className="mb-1">
                          <strong>Syntymävuosi:</strong>{" "}
                          {new Date(a.birth_date).getFullYear()}
                        </p>
                      )}
                    </div>
                  </div>

                  {a.achievements && (
                    <ul
                      className="small mb-3"
                      style={{ paddingLeft: "1.2rem", textAlign: "left" }}
                    >
                      {a.achievements.split(";").map((ach, i) => (
                        <li key={i}>{ach.trim()}</li>
                      ))}
                    </ul>
                  )}

                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openEditModal(a)}
                    >
                      Muokkaa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(a.id)}
                    >
                      Poista
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* 🧾 Modaalinen muokkaus */}
      <AthleteEditModal
        show={showModal}
        onHide={closeEditModal}
        athlete={selectedAthlete}
      />

      {/* 💅 Hover-efekti tyylit */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};

export default AthleteList;
