const Athlete = require("../models/Athlete");

// Hakee kaikki urheilijat
exports.getAllAthletes = async (req, res) => {
  try {
    const [athletes, _] = await Athlete.findAll();
    res.status(200).json({ count: athletes.length, athletes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Hakee urheilijan id:llä
exports.getAthleteById = async (req, res) => {
  try {
    const athleteId = parseInt(req.params.id, 10);
    if (isNaN(athleteId))
      return res.status(400).json({ message: "Invalid ID" });

    const [athlete, _] = await Athlete.findById(athleteId);
    if (!athlete || athlete.length === 0) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    res.status(200).json({ athlete: athlete[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Lisää uuden urheilijan
exports.createAthlete = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    } = req.body;

    const athlete = new Athlete(
      null,
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements
    );

    const result = await athlete.save();
    res.status(201).json({
      message: "Athlete created",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Päivittää urheilijan id:llä
exports.updateAthleteById = async (req, res) => {
  try {
    const athleteId = parseInt(req.params.id, 10);
    if (isNaN(athleteId))
      return res.status(400).json({ message: "Invalid ID" });

    const {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    } = req.body;

    const athlete = {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    };

    const [result] = await Athlete.updateById(athleteId, athlete);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    res.status(200).json({ message: "Athlete updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Poistaa urheilijan id:llä
exports.deleteAthleteById = async (req, res) => {
  try {
    const athleteId = parseInt(req.params.id, 10);
    if (isNaN(athleteId))
      return res.status(400).json({ message: "Invalid ID" });

    const [result] = await Athlete.deleteById(athleteId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    res.status(200).json({ message: "Athlete deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* const Athlete = require("../models/Athlete");

// Hakee kaikki urheilijat
exports.getAllAthletes = async (req, res, next) => {
  try {
    const [athletes, _] = await Athlete.findAll();
    res.status(200).json({ count: athletes.length, athletes });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    next(err);
  }
};

// Hakee urheilijan id:llä
exports.getAthleteById = async (req, res, next) => {
  try {
    let athleteId = Number(req.params.id);
    let [athlete, _] = await Athlete.findById(athleteId);
    res.status(200).json({ athlete: athlete[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    next(err);
  }
};

// Lisää uuden urheilijan
exports.createAthlete = async (req, res, next) => {
  try {
    let {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    } = req.body;
    let athlete = new Athlete(
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements
    );
    athlete = await athlete.save();
    res.status(201).json({ message: "Athlete created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    next(err);
  }
};

// Päivittää urheilijan id:llä);
exports.updateAthleteById = async (req, res, next) => {
  try {
    let athleteId = Number(req.params.id);
    let {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    } = req.body;
    let athlete = {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    };
    const result = await Athlete.updateById(athleteId, athlete);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.status(200).json({ message: "Athlete updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    next(err);
  }
};

// Poistaa urheilijan id:llä
exports.deleteAthleteById = async (req, res, next) => {
  try {
    let athleteId = Number(req.params.id);
    const result = await Athlete.deleteById(athleteId);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.status(200).json({ message: "Athlete deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    next(err);
  }
};
 */
