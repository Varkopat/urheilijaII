import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAthletes } from "../context/AthleteContext";
// import { toast } from "react-toastify";

const AthleteEditModal = ({ show, onHide, athlete }) => {
  const { updateAthlete } = useAthletes();
  const [form, setForm] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "weight" ? parseFloat(value) || "" : value,
    });
  };

  const handleSave = async () => {
    try {
      await updateAthlete(form.id, form);
      // toast.success("Tiedot päivitetty onnistuneesti! 🎉");
      onHide();
    } catch (error) {
      console.error(error);
      // toast.error("Virhe tallennuksessa. Tarkista yhteys palvelimeen.");
    }
  };

  if (!athlete) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Muokkaa urheilijaa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Etunimi</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={form.first_name || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Sukunimi</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={form.last_name || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Kutsumanimi</Form.Label>
            <Form.Control
              type="text"
              name="nickname"
              value={form.nickname || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Syntymäpäivä</Form.Label>
            <Form.Control
              type="date"
              name="birth_date"
              value={form.birth_date || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Paino (kg)</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={form.weight || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Kuvan URL</Form.Label>
            <Form.Control
              type="url"
              name="image_url"
              value={form.image_url || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Laji</Form.Label>
            <Form.Control
              type="text"
              name="sport"
              value={form.sport || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Saavutukset</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="achievements"
              value={form.achievements || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Peruuta
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Tallenna
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AthleteEditModal;
