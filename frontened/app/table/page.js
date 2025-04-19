"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function ModelComparison() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const models = [
    {
      name: "Linear Regression",
      accuracy: "82.3%",
      mse: "12.45",
      rmse: "3.53",
      r2: "0.78",
    },
    {
      name: "Decision Tree",
      accuracy: "87.1%",
      mse: "10.02",
      rmse: "3.17",
      r2: "0.83",
    },
    {
      name: "Random Forest",
      accuracy: "90.6%",
      mse: "7.88",
      rmse: "2.81",
      r2: "0.89",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-4 border-b border-white/10 backdrop-blur-md bg-white/10 sticky top-0 z-20">
        <h1 className="text-xl font-bold">📊 Model Comparison</h1>
        <div className="hidden sm:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/predict" className="hover:text-cyan-400 transition">Predict</Link>
          <Link href="/visualization" className="hover:text-cyan-400 transition">Visualize</Link>
        </div>
        <button onClick={toggleMenu} className="sm:hidden">
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col sm:hidden px-4 py-2 gap-2 text-sm font-medium bg-white/5 border-b border-white/10 animate-fadeIn">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/predict" className="hover:text-cyan-400 transition">Predict</Link>
          <Link href="/visualization" className="hover:text-cyan-400 transition">Visualize</Link>
        </div>
      )}

      {/* Hero */}
      <section className="text-center py-12 px-4 animate-fadeIn">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Compare ML Models Visually
        </h2>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
          Understand how different models like Linear Regression, Decision Tree, and Random Forest perform on your COVID-19 dataset.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="max-w-6xl mx-auto px-4 py-8 w-full animate-slideUp">
        <div className="grid sm:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <div
              key={i}
              className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 hover:scale-[1.02] transition transform duration-300"
            >
              <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">
                {model.name}
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong>Accuracy:</strong> {model.accuracy}
                </li>
                <li title="Mean Squared Error – lower is better">
                  <strong>MSE:</strong> {model.mse}
                </li>
                <li title="Root Mean Squared Error – lower is better">
                  <strong>RMSE:</strong> {model.rmse}
                </li>
                <li title="R-squared Score – higher is better">
                  <strong>R² Score:</strong> {model.r2}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto text-center text-sm text-gray-400 py-6 border-t border-white/10 px-4">
        &copy; {new Date().getFullYear()} COVID-19 ML Dashboard — Designed by {" "}
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
