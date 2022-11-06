import "./styles.css";
import HSLModule from "./hsl";
import { HSLListStopRoutesPage } from "./pages/HSLStopsPage";

export default function App() {
  return (
    <div className="App">
      <HSLModule>
        <HSLListStopRoutesPage />
      </HSLModule>
    </div>
  );
}
