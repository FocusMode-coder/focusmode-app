import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 font-sans">
      <header className="text-center mb-10">
      <h1 className="text-4xl font-bold">👁 Welcome, Luciano!</h1>
        <p className="text-lg text-gray-400 mt-2">
          Track habits. Beat distraction. Build your future.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">📱 Screen Time</h2>
          <p className="text-gray-400 text-sm">Track where your time is going.</p>
          <div className="mt-4 border border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">-- h -- min</p>
            <p className="text-xs text-gray-500 mt-1">Total screen time today</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">✅ Habit Tracker</h2>
          <p className="text-gray-400 text-sm">Check off your daily disciplines.</p>
          <ul className="mt-4 space-y-2">
            <li>📖 Read 10 min <span className="float-right">[ ]</span></li>
            <li>💪 Workout <span className="float-right">[ ]</span></li>
            <li>🧠 No social media <span className="float-right">[ ]</span></li>
          </ul>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">🚀 Focus Suggestions</h2>
          <p className="text-gray-400 text-sm mb-4">You could be building instead of scrolling.</p>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 text-sm">
            <p>Try editing your next product description. Or batch a few reels. Or write 200 words for your guide.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;