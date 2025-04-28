import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Settings from "./pages/Settings";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<h1 className="text-center text-3xl mt-10">404 Not Found</h1>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <div className="bg-secondary text-white min-h-screen font-netflix">
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
        {!showIntro && (
          <>
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
