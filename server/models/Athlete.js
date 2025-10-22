const db = require("../config/db");

// Luokka Athlete
class Athlete {
  constructor( // konstruktori
    id,
    first_name,
    last_name,
    nickname,
    birth_date,
    weight,
    image_url,
    sport,
    achievements
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.nickname = nickname;
    this.birth_date = birth_date;
    this.weight = weight;
    this.image_url = image_url;
    this.sport = sport;
    this.achievements = achievements;
  }

  // Staattinen metodi kaikkien urheilijoiden hakemiseksi
  static findAll() {
    let sql = "SELECT * FROM athletes;";
    return db.execute(sql);
  }

  // Staattinen metodi urheilijan hakemiseksi id:llä
  static findById(id) {
    let sql = `SELECT * FROM athletes WHERE id=${id}`;
    return db.execute(sql);
  }

  // Instanssimetodi urheilijan tallentamiseksi
  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let createdDate = `${yyyy}-${mm}-${dd}`;

    let sql = `INSERT INTO athletes (first_name, last_name, nickname, birth_date, weight, image_url, sport, achievements, created_at) VALUES ('${this.first_name}', '${this.last_name}', '${this.nickname}', '${this.birth_date}', ${this.weight}, '${this.image_url}', '${this.sport}', '${this.achievements}', '${createdDate}')`;

    const [newAthlete, _] = await db.execute(sql);
    return newAthlete;
  }

  // Staattinen metodi urheilijan päivittämiseksi id:llä
  static updateById(id, athlete) {
    let sql = `UPDATE athletes SET first_name='${athlete.first_name}', last_name='${athlete.last_name}', nickname='${athlete.nickname}', birth_date='${athlete.birth_date}', weight=${athlete.weight}, image_url='${athlete.image_url}', sport='${athlete.sport}', achievements='${athlete.achievements}' WHERE id=${id}`;
    return db.execute(sql);
  }

  // Staattinen metodi urheilijan poistamiseksi id:llä
  static deleteById(id) {
    let sql = `DELETE FROM athletes WHERE id=${id}`;
    return db.execute(sql);
  }
}

module.exports = Athlete;
