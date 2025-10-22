import React from "react";
import { AthleteProvider } from "./context/AthleteContext";
import AthleteList from "./components/AthleteList";
import AthleteEditForm from "./components/AthleteEditForm";

function App() {
  return (
    <AthleteProvider>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        <h1>Urheilijarekisteri</h1>
        <AthleteEditForm />
        <AthleteList />
      </div>
    </AthleteProvider>
  );
}

export default App;
