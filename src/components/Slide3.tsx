/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { riskList } from '../data';
import { RiskItem } from '../types';
import { Grid, HelpCircle, Shield, AlertTriangle, PlayCircle, ToggleLeft, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Slide3() {
  const [selectedRiskId, setSelectedRiskId] = useState<string>('risk-1');

  const activeRisk = riskList.find((r) => r.id === selectedRiskId) || riskList[0];

  // Map coordinate coordinates for a 5x5 matrix
  // Probabilidade (Y: 5 up to 1), Impacto (X: 1 up to 5)
  // We will build a visual 5x5 grid in CSS Grid
  const getMatrixCellColor = (prob: number, imp: number) => {
    const score = prob * imp;
    if (score >= 16) return 'bg-rose-500 hover:bg-rose-600 text-white'; // Critical Red
    if (score >= 9) return 'bg-amber-500 hover:bg-amber-600 text-white';  // Medium/High Orange
    if (score >= 4) return 'bg-yellow-400 hover:bg-yellow-500 text-slate-900'; // Moderate Yellow
    return 'bg-emerald-500 hover:bg-emerald-600 text-white';          // Low Green
  };

  return (
    <div id="slide-3" className="h-full flex flex-col justify-between py-2 px-1 text-slate-800">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-3 gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Slide 3 de 3 • Plano de Resposta
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-slate-900 mt-1">
            Matriz de Riscos, Mitigações Executivas e Contingência
          </h2>
        </div>
        <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-150 px-2.5 py-1 rounded-md text-slate-700 text-xs font-semibold">
          <ShieldCheck size={14} className="text-indigo-600 animate-pulse" />
          Ações Recomendadas para Sprint 5
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto py-2">
        
        {/* Left Area: 5x5 Matrix Grid (5 Columns) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 shadow-md rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Grid size={13} className="text-slate-500" />
              Matriz de Riscos 5x5 (Probabilidade vs. Impacto)
            </h3>
            <p className="text-[10.5px] text-slate-500 mb-3.5 leading-snug">
              Selecione as esferas numeradas dentro da matriz para alterar o foco do plano de resposta executivo à direita:
            </p>

            {/* Visual 5x5 Matrix */}
            <div className="relative border border-slate-150 rounded-lg p-3 bg-slate-50/50">
              {/* Y Axis Label */}
              <div className="absolute -left-1.5 top-1/2 -rotate-90 origin-left -translate-y-1/2 text-[8px] font-bold text-slate-700 uppercase tracking-widest">
                Probabilidade (1-5)
              </div>
              
              {/* X Axis Label */}
              <div className="text-center text-[8px] font-bold text-slate-700 uppercase tracking-widest mt-2">
                Impacto Operacional (1-5)
              </div>

              {/* The Grid Blocks */}
              <div className="grid grid-cols-5 gap-1.5 h-44 mt-1.5 ml-3">
                {[5, 4, 3, 2, 1].map((prob) => {
                  return [1, 2, 3, 4, 5].map((imp) => {
                    // Check if there is a risk at this exact probability and impact
                    const risksInCell = riskList.filter((r) => r.probability === prob && r.impact === imp);
                    const isAnyRiskInCell = risksInCell.length > 0;
                    const cellBg = getMatrixCellColor(prob, imp);

                    return (
                      <div
                        key={`${prob}-${imp}`}
                        className={`relative rounded flex items-center justify-center transition-all ${cellBg} border border-white/20`}
                        title={`P: ${prob}, I: ${imp}`}
                      >
                        {/* Cell Background coordinate helpers */}
                        <span className="absolute bottom-0.5 right-0.5 text-[7px] opacity-25 font-mono">
                          {prob},{imp}
                        </span>

                        {/* Interactive Risk Markers inside cell */}
                        {isAnyRiskInCell && (
                          <div className="flex gap-1">
                            {risksInCell.map((risk) => {
                              const isSelected = selectedRiskId === risk.id;
                              return (
                                <button
                                  key={risk.id}
                                  id={`btn-matrix-cell-${risk.id}`}
                                  onClick={() => setSelectedRiskId(risk.id)}
                                  className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all cursor-pointer shadow-sm ${
                                    isSelected 
                                      ? 'scale-125 bg-white text-slate-950 ring-2 ring-indigo-600 ring-offset-1 z-10 font-black' 
                                      : 'bg-slate-900/80 text-white hover:scale-110'
                                  }`}
                                >
                                  {risk.id === 'risk-1' ? '1' : risk.id === 'risk-2' ? '2' : '3'}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>

          {/* Quick list selectors in Left side for backup */}
          <div className="space-y-1 pt-3.5 border-t border-slate-100">
            {riskList.map((r, idx) => (
              <button
                key={r.id}
                id={`btn-risk-list-${r.id}`}
                onClick={() => setSelectedRiskId(r.id)}
                className={`w-full text-left text-[11px] px-2 py-1.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                  selectedRiskId === r.id 
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold' 
                    : 'border-slate-150 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="truncate"><strong>{idx + 1}.</strong> {r.title}</span>
                <span className="text-[10px] font-bold text-slate-400">P:{r.probability} I:{r.impact}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Area: Actionable Mitigations & Contingency Playbook (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Section: 2 Actionable Sprint Mitigations */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-3">
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-1">
              <CheckCircle size={14} className="text-indigo-600" />
              Duas Ações de Mitigação Imediatas (Próxima Sprint 5)
            </h4>

            {/* Split cards for actionables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Action 1 */}
              <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-xs flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-bl">
                  AÇÃO 1 • FOCO TÉCNICO
                </div>
                <div className="space-y-1">
                  <h5 className="text-[11px] font-bold text-slate-900 pr-12">Filtro de Governança PM</h5>
                  <p className="text-[10px] text-slate-600 leading-normal">
                    Transferir reuniões operacionais de Renata/Tiago para <strong>Roberto (PM)</strong>, liberando blocos de foco bloqueados nas agendas semanais para aprovações de PRs críticas.
                  </p>
                </div>
                <div className="text-[9px] bg-slate-50 text-indigo-700 italic border-t border-slate-100 pt-1.5 mt-2 flex items-center gap-1.5 font-medium">
                  <span className="h-1 w-1 rounded-full bg-indigo-500" />
                  Meta: Baixar PR delay de 32h para &lt;12h.
                </div>
              </div>

              {/* Action 2 */}
              <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-xs flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-bl">
                  AÇÃO 2 • SINC CONTRATOS
                </div>
                <div className="space-y-1">
                  <h5 className="text-[11px] font-bold text-slate-900 pr-12">Mocks e Contratos Mínimos</h5>
                  <p className="text-[10px] text-slate-600 leading-normal">
                    Bloquear o início do front de Marina até que o contrato de API seja assinado junto a Tiago. Patricia apoiará na automatização do Mock de testes.
                  </p>
                </div>
                <div className="text-[9px] bg-slate-50 text-indigo-700 italic border-t border-slate-100 pt-1.5 mt-2 flex items-center gap-1.5 font-medium">
                  <span className="h-1 w-1 rounded-full bg-indigo-500" />
                  Meta: Zero quebras de rotas em integrações.
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Playbook for Selected Risk (Mitigation & Contingency details) */}
          <div className="bg-slate-950 text-white rounded-xl p-4 flex-1 flex flex-col justify-between shadow-lg border border-slate-800">
            <div>
              <div className="flex justify-between items-start border-b border-slate-800 pb-2.5">
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-bold bg-indigo-900 border border-indigo-700 px-2 py-0.5 rounded text-indigo-200">
                    Inspeção do Risco Ativo ({activeRisk.id === 'risk-1' ? 'ID 1' : activeRisk.id === 'risk-2' ? 'ID 2' : 'ID 3'})
                  </span>
                  <h4 className="text-xs font-bold font-sans tracking-tight text-white mt-1.5 pr-2.5">
                    {activeRisk.title}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-xs text-rose-400 font-black">Score de Criticidade</div>
                  <div className="text-base font-black text-rose-500 font-mono">
                    {activeRisk.probability * activeRisk.impact}/25
                  </div>
                </div>
              </div>

              {/* Grid content inside inspection card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3">
                <div className="space-y-1.5">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Shield size={12} className="text-indigo-400" />
                    Ação de Mitigação Operacional
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed text-justify">
                    {activeRisk.immediateMitigation}
                  </p>
                  <div className="text-[9px] text-slate-400 font-semibold">
                    Responsável: <span className="text-indigo-300 font-black">{activeRisk.owner}</span>
                  </div>
                </div>

                <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-3.5">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                    <AlertTriangle size={12} className="text-rose-400" />
                    Plano de Contingência e Gatilho
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed text-justify">
                    <strong className="text-rose-400">GATILHO:</strong> {activeRisk.contingencyTrigger}
                  </p>
                  <p className="text-[10px] text-slate-300 leading-relaxed text-opacity-95 text-justify">
                    <strong className="text-emerald-400">PLANO:</strong> {activeRisk.contingencyPlan}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick alert caption */}
            <div className="text-[8.5px] text-slate-500 mt-3 pt-2 border-t border-slate-900 flex items-center gap-1.5">
              <PlayCircle size={10} className="text-amber-500" />
              <span>O disparo de contingências deve ser validado e registrado por Roberto em ata de status semanal.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Footer */}
      <div className="text-[10px] text-slate-400 flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
        <span>*Mitigações alinhadas ao orçamento semanal atual de R$ 36.000 da equipe sem contratação secundária externa.</span>
        <span className="font-semibold text-indigo-600">Apresentação Completa</span>
      </div>
    </div>
  );
}
