import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Organizations from "./pages/Organizations";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-on-background min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizations" element={<Organizations />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}