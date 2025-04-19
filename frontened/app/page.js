"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const parallax = document.getElementById("parallax-bg");
    const handleScroll = () => {
      const offset = window.scrollY;
      parallax.style.backgroundPositionY = offset * 0.5 + "px";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const modelInfo = {
    "Linear Regression": {
      definition:
        "Linear Regression is a supervised learning algorithm used for predicting a continuous dependent variable based on one or more independent variables by fitting a linear equation.",
      accuracy: "36%",
      mse: "24215.16"
    },
    "Decision Tree": {
      definition:
        "Decision Tree is a non-parametric supervised learning method that splits data into subsets using feature values, creating a tree structure for prediction.",
      accuracy: "91%",
      mse: "3392.25"
    },
    "Random Forest": {
      definition:
        "Random Forest is an ensemble of decision trees that improves prediction accuracy by averaging results and reducing overfitting.",
      accuracy: "94%",
      mse: "2140.63"
    }
  };

  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Animated Background */}
      <div
        id="parallax-bg"
        className="fixed inset-0 bg-[url('/bg-animated.svg')] bg-cover bg-center -z-10 opacity-30 animate-fadeIn"
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-lg sticky top-0 z-20">
        <h1 className="text-2xl font-bold tracking-wide">🧬 COVID-19 Predictor</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/predict" className="hover:underline">Predict</Link>
          <Link href="/visualization" className="hover:underline">Visualize</Link>
          <a
            href="https://github.com/derwalaman"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Aman Derwal
          </a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md shadow-lg px-6 py-4 space-y-4 text-sm font-medium border-b border-white/10 z-10 relative">
          <Link href="/predict" className="block hover:underline" onClick={() => setMenuOpen(false)}>Predict</Link>
          <Link href="/visualization" className="block hover:underline" onClick={() => setMenuOpen(false)}>Visualize</Link>
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noreferrer"
            className="block hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            YourName
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-20 pb-32 px-6">
        <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-slideInDown">
          Predict Future COVID-19 Deaths
        </h2>
        <p className="text-lg mt-6 max-w-2xl text-gray-300 animate-fadeIn">
          A futuristic tool to estimate and visualize COVID-19 fatalities using advanced machine learning and real-world data trends.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fadeIn delay-300">
          <Link
            href="/predict"
            className="px-6 py-3 rounded-xl text-lg font-semibold bg-cyan-500 hover:bg-cyan-600 transition shadow-lg"
          >
            Start Predicting
          </Link>
          <Link
            href="/visualization"
            className="px-6 py-3 rounded-xl text-lg font-semibold bg-white/20 border border-white/30 hover:bg-white/30 transition"
          >
            View Visualizations
          </Link>
        </div>
      </section>

      {/* Website Features */}
      <section className="px-6 pb-20 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            title: "Real-Time Predictions",
            desc: "Get fast and accurate estimates based on recent pandemic data."
          },
          {
            title: "Insightful Visualizations",
            desc: "Understand the trends behind cases and death rates with interactive graphs."
          },
          {
            title: "Futuristic Interface",
            desc: "Smooth animations, glassmorphism UI and responsive layout for all devices."
          }
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-2 text-cyan-300">{card.title}</h3>
            <p className="text-gray-300 text-sm">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* Dataset Info */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">📊 Dataset Information</h2>
          <ul className="list-disc text-gray-300 pl-5 space-y-2">
            <li>Sourced from WHO and Kaggle</li>
            <li>Time-series data including daily and cumulative stats</li>
            <li>Cleaned, normalized, and prepared for prediction tasks</li>
            <li>Includes variables such as cases, deaths, trends, rates</li>
          </ul>
        </div>
        <img src="/ss.png" alt="Dataset Info" className="rounded-xl shadow-lg" />
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-pink-400 mb-6">🧠 Features Used for Prediction</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "New_cases",
            "Cumulative_cases",
            "Cumulative_deaths",
            "Days_since_start",
            "New_deaths_7day_avg",
            "New_deaths_14day_avg",
            "Death_rate",
            "Case_growth_rate"
          ].map((feature, i) => (
            <div key={i} className="bg-white/10 p-5 rounded-xl border border-white/20 text-center">
              <p className="text-white font-semibold">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Model & Logic Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-purple-400 mb-6">⚙️ Model & Prediction Logic</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {Object.keys(modelInfo).map((model, i) => (
            <button
              key={i}
              onClick={() => setSelectedModel(model)}
              className="bg-white/10 p-5 rounded-xl border border-white/20 text-center text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {model}
            </button>
          ))}
        </div>
        <p className="text-gray-300">
          We tested several ML models and chose the best performing one based on validation scores. Predictions focus on the next day's deaths based on historical trends and computed features.
        </p>
        <p><span className="text-yellow-300 font-semibold">Accuracy:</span> Measures how close predictions are to the actual results. Higher is better.</p>
        <p><span className="text-pink-300 font-semibold">MSE:</span> Mean Squared Error — the average of squared differences between predicted and actual values. Lower is better.</p>
      </section>


      {/* Real-World Impact Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">🌍 Real-World Impact</h2>
        <p className="text-gray-300">
          This project can assist public health authorities and decision-makers by forecasting death toll trends and helping in proactive response and resource planning.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6 border-t border-white/10">
        &copy; {new Date().getFullYear()} COVID-19 Prediction Project — Designed by <a href="https://github.com/derwalaman" className="underline hover:text-white">Aman Derwal</a>
      </footer>

      {/* Popup for Model Details */}
      {selectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
          <div className="bg-[#1f2937] text-white max-w-4xl w-full p-8 rounded-3xl shadow-2xl animate-fadeInUp relative">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelectedModel(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">{selectedModel}</h3>
            <p className="text-md mb-6 text-gray-300">{modelInfo[selectedModel].definition}</p>
            <div className="space-y-2 text-md text-gray-300">
              <p><span className="text-yellow-300 font-semibold mt-5 mb-5">Accuracy:</span> {modelInfo[selectedModel].accuracy}</p>
              <p><span className="text-pink-300 font-semibold">MSE:</span> {modelInfo[selectedModel].mse}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
