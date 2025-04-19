"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const graphOptions = [
  "Global New Deaths Over Time",
  "Top 10 Countries by Cumulative Deaths",
  "India Daily Deaths Trend",
  "Deaths Over Time in Top 3 Countries",
  "Deaths by WHO Region",
  "Region-wise Daily Deaths Over Time",
  "7-Day Moving Average (Global Deaths)",
  "Avg Deaths by Day of Week",
  "Correlation Heatmap",
  "Boxplot of New Deaths by Region",
  "Actual vs Predicted Deaths - Linear Regression",
  "Decision Tree Model",
  "Feature Importance of Random Forest"
];

export default function VisualizationPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchGraphImage = async (plotType) => {
    setLoading(true);
    try {
      const response = await fetch(`https://covid19deathprediction-production.up.railway.app/generate_graph?plot_type=${plotType}`);
      const data = await response.json();
      setImageData(data.image_data);
    } catch (error) {
      console.error("Error fetching graph:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphImage(graphOptions[selectedIndex]);
  }, [selectedIndex]);

  const handleDropdownChange = (e) => {
    setSelectedIndex(Number(e.target.value));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-md sticky top-0 z-20">
        <h1 className="text-lg sm:text-2xl font-bold">🧬 COVID-19 Predictor</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/predict" className="hover:text-cyan-400 transition">Predict</Link>
          <a href="https://github.com/derwalaman" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Aman Derwal
          </a>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 text-center bg-white/10 backdrop-blur-md py-4 px-6 border-b border-white/10 shadow-md animate-fadeIn">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/predict" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Predict</Link>
          <a
            href="https://github.com/derwalaman"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="hover:underline"
          >
            Aman Derwal
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center pt-16 pb-10 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-slideInDown">
          COVID-19 EDA Visualizations
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Explore various data visualizations on COVID-19 impact, powered by Python and machine learning.
        </p>
      </section>

      {/* Dropdown Selector */}
      <div className="w-full px-4 sm:px-6 mb-8">
        <div className="max-w-md mx-auto">
          <select
            className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={selectedIndex}
            onChange={handleDropdownChange}
          >
            {graphOptions.map((option, idx) => (
              <option key={idx} value={idx} className="text-black">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center my-10">
          <div className="animate-spin border-t-4 border-cyan-500 rounded-full w-12 h-12 border-solid"></div>
        </div>
      )}

      {/* Image Display */}
      {!loading && imageData && (
        <div className="px-4 sm:px-6 mb-16">
          <div className="bg-white/10 p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-md max-w-5xl mx-auto">
            <img
              src={`data:image/png;base64,${imageData}`}
              alt="Visualization Graph"
              className="w-full h-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-auto text-sm text-gray-400 py-6 border-t border-white/10 px-4">
        &copy; {new Date().getFullYear()} COVID-19 Prediction Project — Designed by{" "}
        <a
          href="https://github.com/derwalaman"
          className="underline hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aman Derwal
        </a>
      </footer>
    </div>
  );
}
