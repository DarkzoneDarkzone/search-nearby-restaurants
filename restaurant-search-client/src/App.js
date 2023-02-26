import logo from "./logo.svg";
import "./App.css";
import Restaurant from "./pages/restaurants/restaurant";
import LoadingSpinner from "./components/ui/loading/spinner";

function App() {
  return (
    <div className="App">
      <Restaurant />
    </div>
  );
}

export default App;
