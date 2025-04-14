'use client';
import { useState, useEffect } from 'react';
import HabitTracker from '../components/HabitTracker';

const getLast7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
};

const motivationalQuotes = [
  "“Focus is the gateway to all thinking.” – Daniel Goleman",
  "“Success is the product of daily habits—not once-in-a-lifetime transformations.” – James Clear",
  "“Discipline equals freedom.” – Jocko Willink",
  "“The key to success is to focus on goals, not obstacles.”",
];
const suggestedHabits = [
  '🧘 Meditar 10 minutos',
  '📝 Escribir tus objetivos',
  '💧 Tomar 2 litros de agua',
  '📵 Tiempo sin pantallas',
  '🚶 Caminar 20 minutos',
  '📚 Aprender algo nuevo',
  '🛏️ Dormir 8 horas',
  '💬 Agradecer a alguien hoy',
  '🧹 Ordenar tu espacio',
  '🍎 Comer saludable'
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
  const today = new Date().toISOString().split('T')[0]; // e.g. '2025-04-14'
  const initialGoals = [
    { id: 1, text: '📘 Leer 10 páginas', done: false },
    { id: 2, text: '💪 Hacer ejercicio', done: false },
    { id: 3, text: '📵 No usar redes', done: false },
  ];

  const [user, setUser] = useState(null); // For future login system
  const [language, setLanguage] = useState('es'); // For multilingual support
  const [goals, setGoals] = useState(initialGoals);
  const [streak, setStreak] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [xp, setXp] = useState(0);
  const [quote, setQuote] = useState('');
  const [time, setTime] = useState('');
  const [reminder, setReminder] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [bgClass, setBgClass] = useState('from-black via-gray-900 to-black');
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(1500);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActive(false);
          alert("⏳ ¡Pomodoro completado!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);
  
  useEffect(() => {
    if (timer === 0 && !active) {
      const suggestions = [
        "🎯 Excelente trabajo. Ahora tomate 5 minutos para respirar.",
        "📓 Anotá lo que hiciste en esta sesión.",
        "🚶 Estiráte o caminá un poco antes de continuar.",
        "💡 Reflexioná: ¿qué fue lo más importante que lograste hoy?",
        "📵 Mantené el enfoque, evitá redes sociales ahora."
      ];
      const message = suggestions[Math.floor(Math.random() * suggestions.length)];
      alert(`🧠 Enfoque AI: ${message}`);
    }
  }, [timer, active]);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [suggested, setSuggested] = useState([]);
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState(() => {
    const stored = localStorage.getItem('focusMoodHistory');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const shuffled = suggestedHabits.sort(() => 0.5 - Math.random());
    setSuggested(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    if (mood) {
      const updated = [...moodHistory, { date: today, mood }];
      const unique = Array.from(new Map(updated.map(item => [item.date, item])).values());
      setMoodHistory(unique);
      localStorage.setItem('focusMoodHistory', JSON.stringify(unique));
    }
  }, [mood]);

  useEffect(() => {
    const storedUser = localStorage.getItem('focusUser');
    const storedGoals = localStorage.getItem(`focusGoals-${today}`);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedGoals) setGoals(JSON.parse(storedGoals));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('focusUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(`focusGoals-${today}`, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500); // splash dura 2.5 segundos
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTime(formatted);
      
      const hour = now.getHours();
      if (hour >= 6 && hour < 12) {
        setBgClass('from-yellow-100 via-yellow-300 to-yellow-500');
      } else if (hour >= 12 && hour < 18) {
        setBgClass('from-blue-100 via-blue-300 to-blue-500');
      } else if (hour >= 18 && hour < 21) {
        setBgClass('from-orange-200 via-pink-300 to-red-500');
      } else {
        setBgClass('from-black via-gray-900 to-black');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(newQuote);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReminder(true);
      setTimeout(() => setReminder(false), 5000); // Hide after 5 seconds
    }, 20000); // Trigger every 20 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const days = getLast7Days();
    const result = days.map(date => {
      const saved = localStorage.getItem(`focusGoals-${date}`);
      return saved ? { date, goals: JSON.parse(saved) } : { date, goals: [] };
    });
    setHistory(result);
  }, []);

  const toggleGoal = (id) => {
    const updatedGoals = goals.map(g => g.id === id ? { ...g, done: !g.done } : g);
    setGoals(updatedGoals);
    const completed = updatedGoals.filter(g => g.done).length;
    setStreak(completed);
    const percent = Math.round((completed / goals.length) * 100);
    setProgressPercent(percent);
    const newlyCompleted = updatedGoals.filter(g => g.done).length;
    const xpEarned = newlyCompleted * 10;
    setXp(xpEarned);

    if (xpEarned >= 100 && !localStorage.getItem('achv-100')) {
      alert('🏆 Logro Desbloqueado: ¡100 XP!');
      localStorage.setItem('achv-100', 'true');
    }
    if (xpEarned >= 500 && !localStorage.getItem('achv-500')) {
      alert('🏆 Logro Desbloqueado: ¡500 XP!');
      localStorage.setItem('achv-500', 'true');
    }
  };
  const startTimer = () => setActive(true);
  const resetTimer = () => {
    setActive(false);
    setTimer(1500);
  };

  return (
    <>
      {user === null ? (
        <main className="min-h-screen flex items-center justify-center bg-black text-white p-6">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
            <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Tu nombre"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="w-full p-2 rounded-md text-black outline-none"
            />
            <button
              onClick={() => {
                if (editingText.trim()) {
                  setUser({ name: editingText.trim() });
                  setShowSplash(true);
                  setEditingText('');
                }
              }}
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Entrar
            </button>
          </div>
          
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📋 Reordenar Metas</h2>
            <p className="text-sm text-gray-400 mb-2">Arrastrá y soltá para cambiar el orden de tus metas.</p>
            <ul className="space-y-2" style={{ cursor: 'grab' }}>
              {goals.map((goal, index) => (
                <li
                  key={goal.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const fromIndex = Number(e.dataTransfer.getData('text/plain'));
                    const newGoals = [...goals];
                    const [movedGoal] = newGoals.splice(fromIndex, 1);
                    newGoals.splice(index, 0, movedGoal);
                    setGoals(newGoals);
                  }}
                  className="p-3 bg-zinc-800 rounded-md text-white border border-zinc-700"
                >
                  {goal.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">⏳ Pomodoro Focus Timer</h2>
            <div className="flex items-center justify-between mb-4 text-lg">
              <span>⏱ Tiempo Restante:</span>
              <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="flex gap-4">
              <button onClick={startTimer} className="flex-1 py-2 bg-green-600 text-white rounded-md">Iniciar</button>
              <button onClick={resetTimer} className="flex-1 py-2 bg-red-600 text-white rounded-md">Reset</button>
            </div>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📲 Instalar la App</h2>
            <p className="text-sm mb-4">Agregá FocusMode a tu pantalla de inicio para accederlo como si fuera una app nativa.</p>
            <button
              onClick={() => {
                if (window.matchMedia('(display-mode: standalone)').matches) {
                  alert("Ya estás usando la versión instalada 🚀");
                  return;
                }
                alert("En tu navegador, abrí el menú y elegí 'Agregar a pantalla de inicio'");
              }}
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            >
              Mostrar Instrucciones
            </button>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📊 XP Semanal</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {history.map(({ date, goals }) => {
                const xp = goals.filter(g => g.done).length * 10;
                return (
                  <li key={date} className="flex justify-between items-center">
                    <span>{date}</span>
                    <span className="text-green-400 font-bold">{xp} XP</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🔔 Recordatorio Personalizado</h2>
            <button
              onClick={() => {
                const reminderText = "🚨 ¡Hora de volver a enfocarte!";
                const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
                audio.play();
                alert(reminderText);
              }}
              className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md"
            >
              Probar Recordatorio
            </button>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">💎 Niveles de Enfoque</h2>
            <p className="text-sm mb-2">Tu Nivel Actual:</p>
            <p className="text-xl font-bold text-green-400">
              {xp >= 1000 ? "🔱 Nivel Maestro" :
               xp >= 500 ? "🏅 Nivel Avanzado" :
               xp >= 100 ? "✨ Nivel Intermedio" :
               "🕒 Principiante"}
            </p>
            <p className="text-xs text-gray-400 mt-2">Sigue completando metas para subir de nivel.</p>
          </div>
          
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🔥 Recordatorio de Racha</h2>
            <p className="text-sm mb-4">¿Estás por perder tu racha? Este botón puede salvarte.</p>
            <button
              onClick={() => {
                const incomplete = goals.filter(g => !g.done);
                if (incomplete.length > 0) {
                  const updated = goals.map(g => ({ ...g, done: true }));
                  setGoals(updated);
                  alert("✅ Todas tus metas marcadas como completas. ¡Racha salvada!");
                } else {
                  alert("Ya completaste todas tus metas 🎉");
                }
              }}
              className="w-full py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-md font-semibold"
            >
              Salvar mi Racha
            </button>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🌎 Compartí tu Progreso</h2>
            <p className="text-sm mb-4">Generá un resumen diario que podés compartir.</p>
            <button
              onClick={() => {
                const summary = `📅 ${today}\n✅ Metas completadas: ${goals.filter(g => g.done).length}/${goals.length}\n🎮 XP: ${xp}\n🧠 Nivel: ${
                  xp >= 1000 ? "Nivel Maestro" :
                  xp >= 500 ? "Nivel Avanzado" :
                  xp >= 100 ? "Nivel Intermedio" :
                  "Principiante"
                }`;
                navigator.clipboard.writeText(summary);
                alert("📋 Copiado al portapapeles. ¡Listo para compartir!");
              }}
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-semibold"
            >
              Copiar Resumen
            </button>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🧠 Plan Diario Inteligente</h2>
            <p className="text-sm mb-4">Generá un plan basado en tus hábitos pasados.</p>
            <button
              onClick={() => {
                const frequentGoals = {};
                history.forEach(day => {
                  day.goals.forEach(goal => {
                    frequentGoals[goal.text] = (frequentGoals[goal.text] || 0) + 1;
                  });
                });
                const sorted = Object.entries(frequentGoals).sort((a, b) => b[1] - a[1]);
                const suggestions = sorted.slice(0, 3).map(([text]) => ({
                  id: Date.now() + Math.random(),
                  text,
                  done: false
                }));
                setGoals(suggestions);
                alert("📋 Plan generado basado en tus hábitos más frecuentes.");
              }}
              className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-semibold"
            >
              Generar Plan
            </button>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🧭 Tiempo Total Enfocado</h2>
            <p className="text-lg font-bold text-green-400">{totalFocusTime} minutos</p>
            <p className="text-sm text-gray-400 mt-2">Basado en sesiones Pomodoro completadas.</p>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🌕 Cómo te sentiste hoy</h2>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full p-2 rounded-md bg-zinc-800 text-white border border-zinc-500"
            >
              <option value="">Seleccioná una opción</option>
              <option value="😀 Muy bien">😀 Muy bien</option>
              <option value="🙂 Bien">🙂 Bien</option>
              <option value="😐 Normal">😐 Normal</option>
              <option value="😟 Mal">😟 Mal</option>
              <option value="😔 Muy mal">😔 Muy mal</option>
            </select>
            {mood && (
              <p className="mt-2 text-sm text-green-400">
                Hoy seleccionaste: <strong>{mood}</strong>
              </p>
            )}
          </div>
        </main>
      ) : showSplash ? (
        <div className="min-h-screen bg-black flex items-center justify-center animate-fade-in">
          <img src="/logo.png" alt="Logo" className="h-40 w-40 animate-pulse" />
        </div>
      ) : (
        <main className={`min-h-screen bg-gradient-to-b ${bgClass} text-white flex flex-col items-center justify-center p-6 space-y-6 font-sans transition-all duration-1000 ease-in-out`}>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="absolute top-6 left-6 text-sm px-4 py-2 bg-zinc-800 text-white rounded-full shadow-md hover:bg-zinc-700 transition"
          >
            🌐 {language === 'es' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() =>
              document.documentElement.classList.toggle('dark')
            }
            className="absolute top-6 right-6 text-sm px-4 py-2 bg-zinc-800 text-white rounded-full shadow-md hover:bg-zinc-700 transition"
          >
            🌙 / ☀️
          </button>
          <h1 className="text-4xl sm:text-5xl font-bold text-center animate-pulse">
            🚀 Hello, FocusMode is Live!
          </h1>

          <p className="text-center italic text-gray-400 text-lg">{quote}</p>

          <div className="text-6xl font-bold tracking-wider">{time}</div>

          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🎯 Metas Diarias</h2>
            <p className="text-sm text-gray-400 mb-2 animate-pulse">🔥 Completadas: {streak}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mb-2">Progreso total: {progressPercent}%</p>
            <p className="text-xs text-yellow-400 mb-4">🎮 XP: {xp}</p>
            <div className="text-sm mt-2 text-yellow-400">
              {xp >= 100 && <p>🏅 Logro: 100 XP</p>}
              {xp >= 500 && <p>🥇 Logro: 500 XP</p>}
            </div>
            <ul className="space-y-2">
              {goals.map(goal => (
                <li
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`cursor-pointer p-3 rounded-xl border text-lg text-left ${
                    goal.done ? 'bg-green-700 line-through opacity-60' : 'bg-gray-800 hover:bg-gray-700'
                  } transition-all duration-200`}
                >
                  {editingId === goal.id ? (
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onBlur={() => {
                        const updated = goals.map(g => g.id === goal.id ? { ...g, text: editingText } : g);
                        setGoals(updated);
                        setEditingId(null);
                      }}
                      autoFocus
                      className="bg-transparent border-b border-white text-white outline-none w-full"
                    />
                  ) : (
                    <span onDoubleClick={() => {
                      setEditingId(goal.id);
                      setEditingText(goal.text);
                    }}>
                      {goal.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex mt-4 gap-2">
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                placeholder="Agregar nueva meta"
                className="flex-1 p-2 rounded-md border text-black dark:text-white dark:bg-zinc-800 border-zinc-400 outline-none"
              />
              <button
                onClick={() => {
                  if (editingText.trim()) {
                    const newGoal = {
                      id: Date.now(),
                      text: editingText,
                      done: false,
                    };
                    setGoals([...goals, newGoal]);
                    setEditingText('');
                  }
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Añadir
              </button>
            </div>
          </div>

          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🤖 Sugerencias de Hábitos (AI)</h2>
            <ul className="space-y-2 text-sm">
              {suggested.map((habit, i) => (
                <li key={i} className="bg-zinc-800 px-3 py-2 rounded-md text-white flex justify-between items-center">
                  {habit}
                  <button
                    onClick={() => {
                      const newGoal = {
                        id: Date.now() + i,
                        text: habit,
                        done: false,
                      };
                      setGoals([...goals, newGoal]);
                    }}
                    className="text-green-400 hover:text-green-300 text-xs"
                  >
                    Añadir
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📋 Habit Tracker (Nuevo)</h2>
            <HabitTracker />
          </div>

          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">💸 Cursos Recomendados</h2>
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

          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📤 Exportar Mis Datos</h2>
            <button
              onClick={() => {
                const exportData = {
                  user,
                  goals,
                  date: today,
                };
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `focusmode-${today}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Descargar JSON
            </button>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🧭 Tiempo Total Enfocado</h2>
            <p className="text-lg font-bold text-green-400">{totalFocusTime} minutos</p>
            <p className="text-sm text-gray-400 mt-2">Basado en sesiones Pomodoro completadas.</p>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📥 Importar Datos</h2>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const imported = JSON.parse(event.target.result);
                    if (imported.user) setUser(imported.user);
                    if (Array.isArray(imported.goals)) setGoals(imported.goals);
                    alert('✅ Datos importados correctamente.');
                  } catch (err) {
                    alert('❌ Error al importar el archivo.');
                  }
                };
                reader.readAsText(file);
              }}
              className="w-full p-2 rounded-md bg-zinc-800 text-white border border-zinc-500"
            />
          </div>

          {reminder && (
            <div className="fixed bottom-5 right-5 bg-yellow-500 text-black px-5 py-3 rounded-lg shadow-xl animate-bounce">
              ⏰ ¡Recordá enfocarte en tus metas!
            </div>
          )}
          {streak === goals.length && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
              🎉 ¡Completaste todas tus metas del día!
            </div>
          )}
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📆 Historial de Ánimo</h2>
            <ul className="text-sm space-y-2">
              {moodHistory.slice(-7).reverse().map((entry, i) => (
                <li key={i} className="flex justify-between">
                  <span>{entry.date}</span>
                  <span>{entry.mood}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📆 Historial (Últimos 7 días)</h2>
            <ul className="space-y-4 text-sm">
              {history.map((entry) => (
                <li key={entry.date}>
                  <div className="font-bold text-white">{entry.date}</div>
                  <ul className="list-disc list-inside ml-2 text-gray-300">
                    {entry.goals.length > 0 ? (
                      entry.goals.map((goal, i) => (
                        <li key={i} className={goal.done ? 'line-through text-green-400' : ''}>
                          {goal.text}
                        </li>
                      ))
                    ) : (
                      <li className="italic text-zinc-500">Sin metas</li>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
}