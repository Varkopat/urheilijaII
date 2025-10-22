import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAthletes,
  createAthlete,
  updateAthlete,
  deleteAthlete,
} from "../api/athleteService";

const AthleteContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAthletes = () => useContext(AthleteContext);

export const AthleteProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAthletes = async () => {
    try {
      const response = await getAthletes();
      setAthletes(response.data.athletes || response.data);
    } catch (error) {
      console.error("Failed to fetch athletes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addAthlete = async (athlete) => {
    try {
      await createAthlete(athlete);
      fetchAthletes();
    } catch (error) {
      console.error("Failed to create athlete:", error);
    }
  };

  const editAthlete = async (id, updatedData) => {
    try {
      await updateAthlete(id, updatedData);
      fetchAthletes();
    } catch (error) {
      console.error("Failed to update athlete:", error);
    }
  };

  const removeAthlete = async (id) => {
    try {
      await deleteAthlete(id);
      setAthletes((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete athlete:", error);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        loading,
        addAthlete,
        editAthlete,
        removeAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
