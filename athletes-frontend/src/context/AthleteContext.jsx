import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";

const AthleteContext = createContext();

export const useAthletes = () => useContext(AthleteContext);

const API_URL = "http://localhost:3001/athletes";

export function AthleteProvider({ children }) {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Hae kaikki urheilijat
  const fetchAthletes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Virhe haettaessa urheilijoita");
      const data = await res.json();
      setAthletes(Array.isArray(data) ? data : data.athletes || []);
      /* toast.success("Urheilijat ladattu onnistuneesti 🏃‍♂️", {
        autoClose: 1500,
      }); */
    } catch (err) {
      console.error(err);
      setError("Urheilijoiden haku epäonnistui");
      toast.error("Virhe urheilijoiden haussa ❌");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  // ➕ Lisää uusi urheilija
  const createAthlete = async (athlete) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(athlete),
      });
      if (!res.ok) throw new Error("Lisäys epäonnistui");
      await fetchAthletes();
      toast.success("Urheilija lisätty onnistuneesti ✅");
      return true;
    } catch (err) {
      console.error(err);
      setError("Urheilijan lisäys epäonnistui");
      toast.error("Urheilijan lisäys epäonnistui ❌");
      return false;
    }
  };

  // ✏️ Päivitä urheilija
  const updateAthlete = async (id, athlete) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(athlete),
      });
      if (!res.ok) throw new Error("Päivitys epäonnistui");
      await fetchAthletes();
      toast.success("Tiedot päivitetty onnistuneesti ✏️");
      return true;
    } catch (err) {
      console.error(err);
      setError("Urheilijan päivitys epäonnistui");
      toast.error("Urheilijan päivitys epäonnistui ❌");
      return false;
    }
  };

  // 🗑️ Poista urheilija
  const deleteAthlete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Poisto epäonnistui");
      await fetchAthletes();
      toast.success("Urheilija poistettu onnistuneesti 🗑️");
      return true;
    } catch (err) {
      console.error(err);
      setError("Urheilijan poisto epäonnistui");
      toast.error("Urheilijan poisto epäonnistui ❌");
      return false;
    }
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        loading,
        error,
        fetchAthletes,
        createAthlete,
        updateAthlete,
        deleteAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
}
