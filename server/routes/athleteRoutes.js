const express = require("express");

const router = express.Router(); // Reititin
const athleteControllers = require("../controllers/athleteControllers");

// Reitit

router.get("/", athleteControllers.getAllAthletes); // Hakee kaikki urheilijat
router.get("/:id", athleteControllers.getAthleteById); // Hakee urheilijan id:llä
router.post("/", athleteControllers.createAthlete); // Lisää uuden urheilijan
router.put("/:id", athleteControllers.updateAthleteById); // Päivittää urheilijan id:llä
router.delete("/:id", athleteControllers.deleteAthleteById); // Poistaa urheilijan id:llä

module.exports = router;
