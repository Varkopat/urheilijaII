import React from "react";
import { AthleteProvider } from "./context/AthleteContext";
import AthleteList from "./components/AthleteList";
import AthleteForm from "./components/AthleteForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AthleteProvider>
      <div className="container py-4">
        <header className="text-center mb-5">
          <div className="p-4 bg-primary text-white rounded shadow-sm">
            <h1 className="mb-2">Urheilijarekisteri</h1>
            <p className="lead mb-0">
              Sovelluksessa voit lisätä, muokata, poistaa ja selata urheilijoita
            </p>
          </div>
        </header>

        <main>
          <AthleteForm />
          <AthleteList />
        </main>
      </div>

      {/* 🔔 Toastify ilmoitukset */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </AthleteProvider>
  );
}

export default App;
