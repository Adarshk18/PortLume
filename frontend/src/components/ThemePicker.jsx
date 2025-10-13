import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * ThemePicker component — allows users to switch portfolio themes.
 * Stores selected theme in localStorage and notifies parent via onPick callback.
 */
const themes = [
  {
    id: "ocean",
    name: "Ocean",
    gradient: "from-sky-500 via-indigo-500 to-purple-600",
  },
  {
    id: "sunset",
    name: "Sunset",
    gradient: "from-orange-400 via-pink-500 to-rose-600",
  },
  {
    id: "midnight",
    name: "Midnight",
    gradient: "from-slate-900 via-slate-800 to-black",
  },
  {
    id: "emerald",
    name: "Emerald",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
  },
  {
    id: "cyber",
    name: "Cyber",
    gradient: "from-fuchsia-500 via-cyan-400 to-blue-500",
  },
];

const ThemePicker = ({ onPick }) => {
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("theme") || "ocean";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selected);
    if (onPick) onPick(selected);
    localStorage.setItem("theme", selected);
  }, [selected, onPick]);

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-sky-300">
        🎨 Choose Your Portfolio Theme
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {themes.map((t) => (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(t.id)}
            className={`relative h-20 rounded-xl transition-all duration-300 cursor-pointer bg-gradient-to-r ${t.gradient} ${selected === t.id
                ? "ring-4 ring-sky-400 ring-offset-2 ring-offset-slate-900"
                : "opacity-80 hover:opacity-100"
              }`}
          >
            <span className="absolute bottom-2 left-2 text-sm font-medium text-white drop-shadow">
              {t.name}
            </span>
            {selected === t.id && (
              <motion.div
                layoutId="outline"
                className="absolute inset-0 rounded-xl ring-2 ring-white/60"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ThemePicker;
