import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MapPage from "./pages/Map";
import HistoryPage from "./pages/History";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#07140F] text-[#E8FFF3] font-sans selection:bg-[#37D67A] selection:text-[#07140F]">
          
          {/* Global Sticky Navbar */}
          <Navbar />
          
          {/* Primary Viewport Main Container */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>

          {/* Console Footer */}
          <footer className="bg-[#10251C] border-t border-[#204732] py-4 text-center text-[10px] font-mono text-[#8AA89A]">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 WASTEGUIDE AI OPERATIONS CONSOLE. ALL RIGHTS RESERVED.</p>
              <p className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#37D67A] rounded-full animate-ping"></span>
                SYSTEM STATUS: <span className="text-[#37D67A] font-bold">STABLE</span>
              </p>
            </div>
          </footer>

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
