import axios from "axios";

const API_URL = "http://localhost:3001/athletes";

export const getAthletes = () => axios.get(API_URL);
export const createAthlete = (athlete) => axios.post(API_URL, athlete);
export const updateAthlete = (id, athlete) =>
  axios.put(`${API_URL}/${id}`, athlete);
export const deleteAthlete = (id) => axios.delete(`${API_URL}/${id}`);
export const getAthleteById = (id) => axios.get(`${API_URL}/${id}`);
