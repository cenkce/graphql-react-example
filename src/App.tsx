import "./styles.css";
import HSLModule from "./hsl";
import { HSLStopsPage } from "./pages/HSLStopsPage";

export default function App() {
  return (
    <div className="App">
      <HSLModule>
        <HSLStopsPage />
      </HSLModule>
    </div>
  );
}
