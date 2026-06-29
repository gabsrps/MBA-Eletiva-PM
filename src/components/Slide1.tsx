/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, AlertTriangle, HelpCircle, DollarSign, Users, ShieldAlert, Zap, Calendar } from 'lucide-react';
import { rawTeamCSV } from '../data';

export default function Slide1() {
  // Simulator states
  const [scopeAddition, setScopeAddition] = useState<number>(20); // in percent
  const [meetingOverhead, setMeetingOverhead] = useState<number>(8); // extra hours per week
  const [reviewDelay, setReviewDelay] = useState<number>(1.5); // multiplier

  // Base calculations
  const totalWeeklyHours = rawTeamCSV.reduce((acc, member) => acc + member.hours, 0);
  const totalWeeklyCost = rawTeamCSV.reduce((acc, member) => acc + (member.hours * member.cost), 0);
  
  // Predictive Engine Formula
  // Baseline project is 8 Sprints (8 weeks @ 240 hours/week = 1920 gross capacity)
  // Let's assume baseline scope is 160 Story Points (approx 12 hours per point).
  // Scope additions add story points.
  // Meeting overhead reduces direct coding capacity.
  // Review delay acts as a drag multiplier on throughput.
  const baselineWeeks = 8;
  const baselineCodingHoursPerWeek = totalWeeklyHours - 54; // Assume 54 hours baseline meetings for entire team (Roberto 22, Renata 18, Tiago 14)
  
  // Calculate current available coding capacity per week
  const adjustedCodingHoursPerWeek = Math.max(80, baselineCodingHoursPerWeek - (meetingOverhead * 4)); // Assume 4 engineering members hit by extra meetings
  const scopeCoefficient = 1 + (scopeAddition / 100);
  const reviewDelayFactor = (reviewDelay - 1) * 0.45; // drag impact
  
  const predictedWeeksNeeded = Math.round(
    (baselineWeeks * scopeCoefficient * (baselineCodingHoursPerWeek / adjustedCodingHoursPerWeek)) * (1 + reviewDelayFactor) * 10
  ) / 10;
  
  // Calculate drift
  const driftWeeks = predictedWeeksNeeded - baselineWeeks;
  const driftDays = Math.round(driftWeeks * 5); // 5 working days per week
  const driftPercentage = Math.round((driftWeeks / baselineWeeks) * 100);

  // Projected ETA starting from today June 9, 2026 (baseline ends August 4, 10 days drift makes it Aug 18)
  const baselineDate = new Date('2026-08-04');
  const predictedDate = new Date('2026-08-04');
  predictedDate.setDate(predictedDate.getDate() + (driftWeeks * 7)); // add calendar days

  // Format dates
  const formatDateStr = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  // Status Color
  const getStatusBadge = () => {
    if (driftPercentage <= 5) return { text: 'BAIXO RISCO', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (driftPercentage <= 15) return { text: 'RISCO MODERADO', color: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' };
    return { text: 'ALTO RISCO (CRÍTICO)', color: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' };
  };

  const status = getStatusBadge();

  return (
    <div id="slide-1" className="h-full flex flex-col justify-between py-2 px-1 text-slate-800">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-3 gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Slide 1 de 3 • Relatório Executivo
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-slate-900 mt-1">
            Status Preditivo e Modelo de Desvio (Baseline)
          </h2>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-semibold ${status.color}`}>
          <ShieldAlert size={14} />
          {status.text}
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto py-2">
        {/* Left Side: Contextualization & Stats (6 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Zap size={14} className="text-indigo-500" />
              Contextualização do Relatório
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              Este relatório apresenta uma <strong>visão analítica preditiva</strong> do cronograma do nosso projeto, mapeando métricas coletadas diretamente de nossas ferramentas de colaboração e repositórios de código. 
            </p>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              Em vez de reportarmos apenas o passado, nosso algoritmo correlaciona fatores de capacidade produtiva, contratos de desenvolvimento e tempos de ciclo para antecipar o <strong>desvío de escopo (schedule drift)</strong> e sugerir mitigações acionáveis imediatamente.
            </p>
          </div>

          {/* Baseline Stats Card */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Linha de Base do Time (CSV Ativo)</h4>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-xs">
                <div className="flex justify-center text-indigo-600 mb-1">
                  <Users size={16} />
                </div>
                <div className="text-sm font-bold text-slate-900">{rawTeamCSV.length} devs</div>
                <div className="text-[9px] text-slate-500 font-medium">Equipe Alocada</div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-xs">
                <div className="flex justify-center text-emerald-600 mb-1">
                  <Clock size={16} />
                </div>
                <div className="text-sm font-bold text-slate-900">{totalWeeklyHours}h</div>
                <div className="text-[9px] text-slate-500 font-medium">Capacidade Brutal</div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-xs">
                <div className="flex justify-center text-amber-600 mb-1">
                  <DollarSign size={16} />
                </div>
                <div className="text-sm font-bold text-slate-900">
                  R$ {(totalWeeklyCost / 1000).toFixed(1)}k
                </div>
                <div className="text-[9px] text-slate-500 font-medium">Custo / Semana</div>
              </div>
            </div>

            {/* Team summary preview inline */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {rawTeamCSV.map((m, i) => (
                <span key={i} className="text-[9px] bg-white font-medium border border-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                  {m.name} ({m.seniority[0]}k/h)
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Drift Simulator (7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 shadow-md rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="text-amber-500" size={14} />
                Simulador Preditivo de Desvio de Cronograma (Drift Engine)
              </h3>
              <div className="group relative">
                <HelpCircle size={14} className="text-slate-400 cursor-pointer" />
                <div className="absolute right-0 top-6 w-52 p-2 bg-slate-900 text-white rounded text-[10px] hidden group-hover:block leading-relaxed z-10">
                  Simule como o aumento de escopo, interrupções por reuniões semanais e lentidão na aprovação de de PRs alteram a projeção matemática de entrega.
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mb-3">
              Mova os controles abaixo para modelar novos eventos e ver o impacto imediato na meta (Sprint 4 de 8 em andamento):
            </p>

            {/* Sliders container */}
            <div className="space-y-3.5 mb-4 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Acréstimo de Escopo Não Planejado (Sprint Creep):</span>
                  <span className="text-indigo-600 font-bold">+{scopeAddition}%</span>
                </div>
                <input
                  id="slider-scope"
                  type="range"
                  min="0"
                  max="50"
                  value={scopeAddition}
                  onChange={(e) => setScopeAddition(Number(e.target.value))}
                  className="w-full cursor-pointer accent-indigo-600 h-1.5 bg-slate-200 rounded-lg"
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Horas Extras em Reuniões (por membro/semana):</span>
                  <span className="text-indigo-600 font-bold">+{meetingOverhead}h/semana</span>
                </div>
                <input
                  id="slider-meetings"
                  type="range"
                  min="0"
                  max="16"
                  value={meetingOverhead}
                  onChange={(e) => setMeetingOverhead(Number(e.target.value))}
                  className="w-full cursor-pointer accent-indigo-600 h-1.5 bg-slate-200 rounded-lg"
                />
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Coeficiente de Atraso em Code Review (PRs bloqueados):</span>
                  <span className="text-indigo-600 font-bold">{reviewDelay}x</span>
                </div>
                <input
                  id="slider-delay"
                  type="range"
                  min="1.0"
                  max="2.5"
                  step="0.1"
                  value={reviewDelay}
                  onChange={(e) => setReviewDelay(Number(e.target.value))}
                  className="w-full cursor-pointer accent-indigo-600 h-1.5 bg-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Results Widget */}
          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
            {/* Predicted Status Card */}
            <div className="bg-slate-900 text-white rounded-lg p-3 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Drift Preditivo
                </span>
                <div className="text-2xl font-extrabold text-white mt-1.5">
                  +{driftDays} dias <span className="text-xs font-normal text-slate-300">({driftPercentage}%)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Projeção matemática: {predictedWeeksNeeded} sprints necessárias.
                </p>
              </div>
              <div className="mt-2 text-[10px] border-t border-slate-800 pt-1 text-indigo-300 flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${driftPercentage > 15 ? 'bg-rose-500' : driftPercentage > 5 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                Status Geral: {driftPercentage > 15 ? 'Em perigo crítico' : driftPercentage > 5 ? 'Atenção redobrada' : 'Conforme planejado'}
              </div>
            </div>

            {/* ETA Target Deviation */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                  <Calendar size={10} /> Projeção de Data de Entrega
                </span>
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Baseline (Meta original):
                </div>
                <div className="text-xs font-bold text-slate-600 line-through">
                  {formatDateStr(baselineDate)}
                </div>
                
                <div className="text-xs text-slate-700 mt-1 font-medium">
                  Nova Projeção (IA Drift):
                </div>
                <div className="text-sm font-black text-rose-600">
                  {formatDateStr(predictedDate)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Bottom Caption */}
      <div className="text-[10px] text-slate-400 flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
        <span>*Modelo de IA baseado na capacidade empírica de 240 horas-homem semanais totais.</span>
        <span className="font-medium text-slate-500">Próximo: Slide 2 - Identificação de Risco via Dados</span>
      </div>
    </div>
  );
}
