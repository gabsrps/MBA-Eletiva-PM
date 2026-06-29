/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  Play, 
  X, 
  Layers, 
  TrendingUp, 
  Download, 
  CheckCircle,
  Briefcase,
  Users
} from 'lucide-react';
import { rawTeamCSV } from './data';
import Slide1 from './components/Slide1';
import Slide2 from './components/Slide2';
import Slide3 from './components/Slide3';

export default function App() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showCsvModal, setShowCsvModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Keyboard navigation listeners (Left/Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCsvModal) return; // ignore arrow keys if CSV modal is open
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
       window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSlide, showCsvModal]);

  const nextSlide = () => {
    if (activeSlide < 2) {
      setActiveSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(prev => prev - 1);
    }
  };

  // Raw CSV generation helper for copy/paste
  const getRawCsvText = () => {
    const headers = 'membro,papel,senioridade,especialidade,horas_semana_disponiveis,custo_hora\n';
    const rows = rawTeamCSV.map(m => 
      `${m.name},${m.role},${m.seniority},${m.specialty},${m.hours},${m.cost}`
    ).join('\n');
    return headers + rows;
  };

  const copyCsvToClipboard = () => {
    navigator.clipboard.writeText(getRawCsvText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Render correct slide component
  const renderSlide = () => {
    switch (activeSlide) {
      case 0:
        return <Slide1 />;
      case 1:
        return <Slide2 />;
      case 2:
        return <Slide3 />;
      default:
        return <Slide1 />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Visual background lights to create an executive, elegant feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Corporate Top Header Rail */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 md:px-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Layers size={18} />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5 uppercase">
              Relatório Preditivo de Risco 
              <span className="text-[10px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full font-bold">
                Módulo 2
              </span>
            </h1>
            <p className="text-[10.5px] text-slate-400 font-medium">
              Linha de Base & Gestão de Desvios • Trilha PM
            </p>
          </div>
        </div>

        {/* Header Tools */}
        <div className="flex items-center gap-2">
          {/* CSV Database trigger button */}
          <button
            id="btn-view-csv"
            onClick={() => setShowCsvModal(true)}
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-850 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 transition-all cursor-pointer shadow-sm"
          >
            <Database size={13} className="text-indigo-400" />
            <span>Dados Originais (CSV)</span>
          </button>
        </div>
      </header>

      {/* Main Slide Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col justify-center z-10">
        
        {/* Animated Presentation Frame */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 min-h-[500px] flex flex-col justify-between overflow-hidden relative">
          
          {/* Presentation stage border bar indicating active slide */}
          <div className="h-1.5 bg-slate-100 w-full flex">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((activeSlide + 1) / 3) * 100}%` }}
            />
          </div>

          {/* Mount the current slide */}
          <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex-1 flex flex-col justify-between"
              >
                {renderSlide()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </main>

      {/* Navigation Footer Controls Bar */}
      <footer className="bg-slate-950/80 backdrop-blur-md border-t border-slate-800 py-3.5 px-4 md:px-8 flex justify-between items-center z-10">
        
        {/* Keyboard tips label */}
        <div className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-500 font-mono bg-slate-900/50 px-2 py-1 rounded">
          <span className="kbd bg-slate-800 text-slate-300 px-1 py-0.5 rounded border border-slate-700">←</span>
          <span>ou</span>
          <span className="kbd bg-slate-800 text-slate-300 px-1 py-0.5 rounded border border-slate-700">→</span>
          <span>para avançar slides</span>
        </div>

        {/* Center Bullet Pagination */}
        <div className="flex items-center gap-4">
          <button
            id="btn-prev-slide"
            onClick={prevSlide}
            disabled={activeSlide === 0}
            className={`p-2.5 rounded-lg border flex items-center gap-1 transition-all text-xs font-semibold cursor-pointer ${
              activeSlide === 0 
                ? 'border-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
                : 'border-slate-700 hover:border-indigo-500 text-slate-200 bg-slate-900'
            }`}
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Dot navigation */}
          <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {[0, 1, 2].map((idx) => {
              const slideTitles = ["Status Preditivo", "Identificação de Risco", "Mitigação & Contingência"];
              return (
                <button
                  key={idx}
                  id={`btn-dot-nav-${idx}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`relative block h-2.5 rounded-full transition-all cursor-pointer group ${
                    activeSlide === idx 
                      ? 'w-8 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]' 
                      : 'w-2.5 bg-slate-700 hover:bg-slate-400'
                  }`}
                  title={slideTitles[idx]}
                >
                  {/* Hover tooltip */}
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold border border-slate-850">
                    {slideTitles[idx]}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            id="btn-next-slide"
            onClick={nextSlide}
            disabled={activeSlide === 2}
            className={`p-2.5 rounded-lg border flex items-center gap-1 transition-all text-xs font-semibold cursor-pointer ${
              activeSlide === 2 
                ? 'border-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
                : 'border-slate-700 hover:border-indigo-500 text-slate-200 bg-slate-900'
            }`}
          >
            <span className="hidden sm:inline">Próximo</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right side page index indicator */}
        <div className="text-xs font-bold text-slate-400 font-mono bg-slate-900/50 px-3 py-1 rounded">
          SLIDE {activeSlide + 1} / 3
        </div>

      </footer>

      {/* Raw CSV Database Backdrop Modal */}
      <AnimatePresence>
        {showCsvModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-slate-950 border-b border-slate-800 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Database size={18} className="text-indigo-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Visualizador de Banco de Dados CSV</h3>
                    <p className="text-[10px] text-slate-400">Dados originais do time de desenvolvimento compilados por custo-hora</p>
                  </div>
                </div>
                <button
                  id="btn-close-csv"
                  onClick={() => setShowCsvModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-450 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-4">
                
                {/* Visual table presentation */}
                <div className="bg-slate-950 rounded-lg border border-slate-850 overflow-hidden">
                  <table className="min-w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-850 bg-slate-900/50 text-slate-450 font-bold">
                        <th className="py-2.5 px-3">membro</th>
                        <th className="py-2.5 px-2">papel</th>
                        <th className="py-2.5 px-2">senioridade</th>
                        <th className="py-2.5 px-2">especialidade</th>
                        <th className="py-2.5 px-2 text-center">horas/sem</th>
                        <th className="py-2.5 px-2 text-right">custo_hora</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/50 text-slate-300 font-mono">
                      {rawTeamCSV.map((m, i) => (
                        <tr key={i} className="hover:bg-slate-900/30">
                          <td className="py-2 px-3 font-semibold text-white">{m.name}</td>
                          <td className="py-2 px-2 text-slate-400">{m.role}</td>
                          <td className="py-2 px-2 text-slate-400">{m.seniority}</td>
                          <td className="py-2 px-2 text-slate-400">{m.specialty}</td>
                          <td className="py-2 px-2 text-center text-indigo-300 font-bold">{m.hours}h</td>
                          <td className="py-2 px-2 text-right text-emerald-400 font-bold">R$ {m.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Raw string block preview */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="font-mono">formato_arquivo: .csv (raw string payload)</span>
                    <button
                      id="btn-copy-csv"
                      onClick={copyCsvToClipboard}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle size={10} className="text-emerald-400" />
                          <span className="text-emerald-405">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Download size={10} />
                          <span>Copiar CSV</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-black/40 text-indigo-300 text-[10px] font-mono p-3 rounded-lg border border-slate-850 overflow-x-auto whitespace-pre-wrap select-all">
                    {getRawCsvText()}
                  </pre>
                </div>

              </div>

              {/* Modal footer */}
              <div className="bg-slate-950 p-3.5 border-t border-slate-800 flex justify-end">
                <button
                  id="btn-modal-entendido"
                  onClick={() => setShowCsvModal(false)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
                >
                  Entendido, voltar à apresentação
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
