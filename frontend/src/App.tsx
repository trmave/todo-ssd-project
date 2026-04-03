import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col pb-24">
      <header className="flex justify-between items-center px-6 py-4 w-full bg-[#0e0e0e]/80 backdrop-blur-xl docked full-width top-0 z-50 shadow-[0_4px_20px_rgba(125,74,199,0.08)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#7D4AC7]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#e5e2e1]">Todo SSD Stardrop</h1>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-surface-container-high)] transition-colors duration-300 text-[#e5e2e1]">
            <span className="material-symbols-outlined">search</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--color-outline-variant)]/20">
            <img className="w-full h-full object-cover" alt="farmer avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6LZLqOWliRq2mYvfweiAGa4sdTkiHlBEAOcYMfFOX3Wtu_JdrJZtr2l0nPXmdvEfHT1k2DMCS70Tf8rYO6_TmOfszlwBRX8nPa_cCVGaSsnwRRZZ1XT6l_pwZega_uZFUYKNH2gzhtZMIfKcPtjE4GTv0ISoBMaOkBc82RKgbMLCkt4OrePyNek_JcXDXzii-3pVYSNi0vXO7dhmCgo9McA7KCr4XyscyW36CIDcHopMksXXZyWthdSDalR0ISdkJ4BEgl2wvPagy"/>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 pt-8 max-w-lg mx-auto w-full space-y-8">
        <section className="col-span-2 iridium-glass p-6 rounded-xl border border-[var(--color-outline-variant)]/15 flex justify-between items-end overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-[var(--color-secondary)] font-label text-[10px] uppercase tracking-widest mb-1">Current Progress</p>
            <h2 className="font-headline text-4xl font-bold text-[var(--color-on-background)]">SSD</h2>
            <p className="text-[var(--color-on-surface-variant)] text-xs mt-1">Farm Efficiency</p>
          </div>
          <div className="relative z-10 text-right">
            <span className="material-symbols-outlined text-[var(--color-secondary)] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--color-primary-container)]/20 blur-3xl rounded-full"></div>
        </section>

        <TodoList />
      </main>
    </div>
  );
}

export default App;
