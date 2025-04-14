'use client';
import { useState, useEffect } from 'react';

const motivationalQuotes = [
  "“Focus is the gateway to all thinking.” – Daniel Goleman",
  "“Success is the product of daily habits—not once-in-a-lifetime transformations.” – James Clear",
  "“Discipline equals freedom.” – Jocko Willink",
  "“The key to success is to focus on goals, not obstacles.”",
];

const affiliateLinks = [
  {
    label: "🔥 Aprende IA y gana más",
    url: "https://go.hotmart.com/O99192220K",
  },
  {
    label: "🚀 Transformá tu vida",
    url: "https://go.hotmart.com/O99192220K?ap=5760",
  },
];

export default function Home() {
  const initialGoals = [
    { id: 1, text: '📘 Leer 10 páginas', done: false },
    { id: 2, text: '💪 Hacer ejercicio', done: false },
    { id: 3, text: '📵 No usar redes', done: false },
  ];

  const [goals, setGoals] = useState(initialGoals);
  const [quote, setQuote] = useState('');
  const [time, setTime] = useState('');
  const [reminder, setReminder] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500); // splash dura 2.5 segundos
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTime(formatted);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(newQuote);
  }, []);

  useEffect(() => {
    const reminderTime = 20;
    const timer = setTimeout(() => {
      setReminder(true);
    }, reminderTime * 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  return (
    <>
      {showSplash ? (
        <div className="min-h-screen bg-black flex items-center justify-center animate-fade-in">
          <img src="/logo.png" alt="Logo" className="h-40 w-40 animate-pulse" />
        </div>
      ) : (
        <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6 space-y-6 font-sans transition-all duration-1000 ease-in-out">
          <h1 className="text-4xl sm:text-5xl font-bold text-center animate-pulse">
            🚀 Hello, FocusMode is Live!
          </h1>

          <p className="text-center italic text-gray-400 text-lg">{quote}</p>

          <div className="text-6xl font-bold tracking-wider">{time}</div>

          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">🎯 Metas Diarias</h2>
            <ul className="space-y-2">
              {goals.map(goal => (
                <li
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`cursor-pointer p-3 rounded-xl border text-lg text-left ${
                    goal.done ? 'bg-green-700 line-through opacity-60' : 'bg-gray-800 hover:bg-gray-700'
                  } transition-all duration-200`}
                >
                  {goal.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mt-6 mb-2">💸 Cursos Recomendados</h2>
            <div className="grid gap-3">
              {affiliateLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-lg transform hover:scale-105 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {reminder && (
            <div className="fixed bottom-5 right-5 bg-yellow-500 text-black px-5 py-3 rounded-lg shadow-xl animate-bounce">
              ⏰ ¡Recordá enfocarte en tus metas!
            </div>
          )}
        </main>
      )}
    </>
  );
}