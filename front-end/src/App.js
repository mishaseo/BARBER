import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home_page";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/explore" element={<Results />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
