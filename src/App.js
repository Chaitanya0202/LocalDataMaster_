import "./App.css";
import { AppProvider } from "./Components/Context/UserContext";
import CrudFile from "./Components/CrudFile";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <CrudFile />
      </AppProvider>
    </div>
  );
}

export default App;
