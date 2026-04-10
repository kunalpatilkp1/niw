import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import Scene3D from "./components/Scene3D";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AIMarketingPage from "./pages/AIMarketingPage";
import PricingPage from "./pages/PricingPage";
import IndustriesPage from "./pages/IndustriesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ResultsPage from "./pages/ResultsPage";
import AffiliatePage from "./pages/AffiliatePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Global 3D Scene Background */}
        <Scene3D />
        
        {/* Main Content */}
        <div className="content-overlay">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ai-marketing" element={<AIMarketingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/affiliate" element={<AffiliatePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
          <FloatingButtons />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
