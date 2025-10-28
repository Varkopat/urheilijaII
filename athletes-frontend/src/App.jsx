import "./App.css";
import { AthleteProvider } from "./context/AthleteContext";
import AthleteForm from "./components/AthleteForm";
import AthleteList from "./components/AthleteList";

function App() {
  return (
    <AthleteProvider>
      <div className="container py-4">
        <header className="text-center mb-5">
          <div className="p-4 bg-primary text-white rounded shadow-sm">
            <h1 className="mb-2">Urheilijat</h1>
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
    </AthleteProvider>
  );
}

export default App;
