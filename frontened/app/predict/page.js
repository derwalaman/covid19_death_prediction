"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Predict() {
  const [formData, setFormData] = useState({
    New_cases: "",
    Cumulative_cases: "",
    Cumulative_deaths: "",
    Days_since_start: "",
    New_deaths_7day_avg: "",
    New_deaths_14day_avg: "",
    Death_rate: "",
    Case_growth_rate: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // for mobile nav

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://covid19deathprediction-production.up.railway.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
              key,
              parseFloat(value),
            ])
          )
        ),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Prediction failed.");
      setResult(data.Predicted_new_deaths);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-md sticky top-0 z-20">
        <h1 className="text-lg sm:text-2xl font-bold">🧬 COVID-19 Predictor</h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-4 text-xs sm:text-sm font-medium">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/visualization" className="hover:text-cyan-400 transition">Visualize</Link>
          <a
            href="https://github.com/derwalaman"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Aman Derwal
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col bg-white/10 backdrop-blur-md border-b border-white/10 shadow-md text-center text-sm font-medium py-4 space-y-2">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/visualization" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Visualize</Link>
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
          Predict COVID-19 Deaths Instantly
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Enter the latest data to forecast potential fatalities using ML-powered predictive modeling.
        </p>
      </section>

      {/* Form Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="text-sm text-gray-300 mb-1 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="p-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Enter value"
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="col-span-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl py-3 text-lg font-semibold mt-2 disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict Now"}
          </button>

          {error && (
            <p className="col-span-full text-center text-red-400 font-medium mt-2">
              {error}
            </p>
          )}

          {result !== null && !error && (
            <p className="col-span-full text-center text-xl font-bold text-green-400 mt-4">
              Predicted New Deaths: {result}
            </p>
          )}
        </div>
      </section>

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
