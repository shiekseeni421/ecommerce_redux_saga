import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddCartPage from "./Pages/AddCartPage";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/addcart" element={<AddCartPage />} />
      </Routes>
    </div>
  );
}

export default App;
