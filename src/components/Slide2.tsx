/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { correlationDataset, teamMembers } from '../data';
import { CorrelationData } from '../types';
import { BarChart3, Users, HelpCircle, Activity, BookOpen, UserCheck, Flame, GitMerge, AlertCircle } from 'lucide-react';

export default function Slide2() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('renata');
  const [activeTab, setActiveTab] = useState<'chart' | 'matrix'>('chart');

  const selectedData = correlationDataset.find((d) => d.memberId === selectedMemberId) || correlationDataset[0];
  const selectedMemberDetails = teamMembers.find((m) => m.id === selectedMemberId) || teamMembers[0];

  // Helper to place on visual 2D grid (X: Meeting Hours 0-24, Y: Commits 0-40)
  // We'll calculate percentages for positioning in a absolute grid
  const getPosition = (meetHours: number, commits: number) => {
    const maxMeetings = 24;
    const maxCommits = 40;
    
    // Invert Y because SVG/HTML moves top-to-bottom
    const xPct = (meetHours / maxMeetings) * 85 + 8; // margins
    const yPct = 90 - (commits / maxCommits) * 80;    // margins
    
    return { x: xPct, y: yPct };
  };

  // Diagnostics text based on selected member
  const getDiagnostic = (data: CorrelationData) => {
    switch (data.memberId) {
      case 'renata':
        return {
          title: 'ESTADO: SOBRECARGA E GARGALO CRÍTICO',
          desc: '18h semanais consumidas por reuniões aliadas a 32h de espera média de Pull Request. Sendo a Tech Lead (Sênior, R$ 180/h), seu foco deveria estar na arquitetura. Sua sobrecarga está atrasando todo o fluxo de backend do time.',
          impact: 'Crítico • Atua como Único Ponto de Falha (SPOF) do sistema.',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      case 'tiago':
        return {
          title: 'ESTADO: GARGALO TÉCNICO',
          desc: 'Tiago tem 14h de reuniões e 11 commits. O desenvolvedor backend sênior está arrastado para tomadas de decisão que limitam seu tempo focado em infraestrutura, bloqueando commits prontos de Lucas e testes de Patricia.',
          impact: 'Alto • Bloqueio nos deploys de serviços e banco de dados.',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      case 'marina':
        return {
          title: 'ESTADO: SILO ISOLADO (ALTO RISCO)',
          desc: 'Marina é super produtiva (38 commits) mas tem conexão quase nula com o time (3h de reuniões). Isso constrói um silo de frontend, onde as telas são feitas rapidamente em cima de mocks desatualizados, quebrando no dia da integracão.',
          impact: 'Crítico • Causa retrabalho duplo na pipeline de validação.',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 'lucas':
        return {
          title: 'ESTADO: FLUXO SAUDÁVEL',
          desc: 'Lucas mantém boa produtividade (14 commits) com carga moderada de reuniões (8h). No entanto, o atraso de validação das atualizações de modelagem de dados no QA ocorre devido aos gargalos em outros membros.',
          impact: 'Estável, mas pendente de dependências externas.',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'patricia':
        return {
          title: 'ESTADO: OCIOSIDADE SÍNCRONA / ESTRESSE DE RELEASE',
          desc: 'Patricia (QA) fica refém de entregáveis de backend e frontend atrasados. Nos primeiros dias da Sprint não tem o que testar, acumulando sobrecarga de testes manuais e regressão nas últimas 48h da sprint.',
          impact: 'Alto • Gargalo de controle de qualidade na virada de versão.',
          badgeColor: 'bg-amber-50 text-amber-500 border-amber-200'
        };
      case 'roberto':
        default:
        return {
          title: 'ESTADO: ALTA CARGA DE SINCRONIZAÇÃO SÊNIOR',
          desc: 'Como PM / Scrum Master, Roberto assume 22h semanais de reuniões. Ele deve focar na eliminação de impedimentos, mas a forma atual de reuniões está forçando uma sobrecarga mecânica na equipe técnica de arquitetura.',
          impact: 'Moderado • Facilitador com alto custo operacional síncrono.',
          badgeColor: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  const diagnosis = getDiagnostic(selectedData);

  return (
    <div id="slide-2" className="h-full flex flex-col justify-between py-2 px-1 text-slate-800">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-3 gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Slide 2 de 3 • Cruzamento de Dados
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-slate-900 mt-1">
            Identificação de Risco via Telemetria Dupla
          </h2>
        </div>
        
        {/* Toggle Option Tabs */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'chart' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-950'}`}
          >
            Gráfico de Dispersão
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'matrix' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-950'}`}
          >
            Tabela de Correlação
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto py-2">
        {/* Left Side: Interative Graph Area (7 Columns) */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                <Activity size={14} className="text-indigo-600 animate-pulse" />
                Matriz de Correlação: Esforço de Sync vs. Commits de Código
              </h3>
              <span className="text-[9px] text-slate-500 font-semibold bg-white border px-1.5 py-0.5 rounded">
                Eixo X: Reuniões (Calendar) • Eixo Y: Commits (GitHub)
              </span>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Clique nos pontos ou na lista lateral para analisar a dicotomia entre as duas fontes de dados:
            </p>
          </div>

          {activeTab === 'chart' ? (
            /* Custom Scatter Plot Grid with quadrants */
            <div className="relative h-60 w-full bg-white border border-slate-200 rounded-lg mt-3 shadow-xs overflow-hidden">
              {/* Quadrant backgrounds */}
              {/* Top-Left: Silo Zone (Low Meetings, High Commits) */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-amber-50/20 flex items-start justify-start p-2 border-r border-b border-dashed border-slate-100">
                <span className="text-[8.5px] font-bold text-amber-600 opacity-60 tracking-wider">
                  ZONA A: SILOS ISOLADOS (Alta Produtividade sem Sync)
                </span>
              </div>
              
              {/* Bottom-Right: Overload Zone (High Meetings, Low Commits) */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-rose-50/20 flex items-end justify-end p-2">
                <span className="text-[8.5px] font-bold text-rose-600 opacity-60 tracking-wider text-right">
                  ZONA B: SOBRECARGA OU ARRASTADOS (Alta Sync, Baixo Commits)
                </span>
              </div>

              {/* Grid Lines */}
              <div className="absolute bottom-0 left-8 right-4 h-0.5 bg-slate-400" /> {/* X Axis */}
              <div className="absolute bottom-4 top-4 left-8 w-0.5 bg-slate-400" /> {/* Y Axis */}

              {/* Y Axis Grid lines / Labels */}
              <div className="absolute left-1 top-4 text-[9px] font-mono text-slate-400">40 —</div>
              <div className="absolute left-1 top-[118px] text-[9px] font-mono text-slate-400">20 —</div>
              <div className="absolute left-1 bottom-4 text-[9px] font-mono text-slate-400">0 —</div>
              
              {/* X Axis Labels */}
              <div className="absolute bottom-1 left-8 text-[9px] font-mono text-slate-400">0 h</div>
              <div className="absolute bottom-1 left-[50%] text-[9px] font-mono text-slate-400">12 h</div>
              <div className="absolute bottom-1 right-4 text-[9px] font-mono text-slate-400">24 h</div>

              {/* Scatter Points Mapping */}
              {correlationDataset.map((item) => {
                const pos = getPosition(item.meetingHoursPerWeek, item.commitsPerWeek);
                const isSelected = selectedMemberId === item.memberId;
                const memberDetails = teamMembers.find(m => m.id === item.memberId);
                const color = memberDetails?.avatarColor || '#6366f1';

                return (
                  <button
                    key={item.memberId}
                    id={`btn-point-${item.memberId}`}
                    onClick={() => setSelectedMemberId(item.memberId)}
                    className="absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: isSelected ? 30 : 20 }}
                  >
                    {/* Ring helper for selection */}
                    <div className={`p-1.5 rounded-full transition-all flex items-center justify-center ${isSelected ? 'scale-125 ring-2 ring-indigo-600 ring-offset-2' : 'hover:scale-110'}`}>
                      <div
                        className="h-4 w-4 rounded-full shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                    
                    {/* Tiny Floating Name Label */}
                    <span className={`absolute mt-1 -translate-x-1/3 left-full bg-slate-800 text-white font-bold text-[8px] px-1 py-0.5 rounded whitespace-nowrap shadow-xs transition-opacity ${isSelected ? 'opacity-100 flex' : 'opacity-60 hover:opacity-100'}`}>
                      {item.memberName} ({item.commitsPerWeek} C, {item.meetingHoursPerWeek}h)
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Interactive Data Table Grid */
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 mt-3 shadow-xs h-60 overflow-y-auto">
              <table className="min-w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] text-slate-500 uppercase font-semibold">
                    <th className="py-2 px-2">Colaborador</th>
                    <th className="py-2 px-1 text-center">Commits (Y)</th>
                    <th className="py-2 px-1 text-center font-bold text-indigo-700">Mtg. Hours (X)</th>
                    <th className="py-2 px-1 text-center">PR Review Delay</th>
                    <th className="py-2 px-1 text-center">Story Points</th>
                    <th className="py-2 px-1 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {correlationDataset.map((item) => {
                    const isSelected = selectedMemberId === item.memberId;
                    return (
                      <tr 
                        key={item.memberId}
                        onClick={() => setSelectedMemberId(item.memberId)}
                        className={`cursor-pointer hover:bg-indigo-50/30 transition-all ${isSelected ? 'bg-indigo-50/70' : ''}`}
                      >
                        <td className="py-2 px-2 font-semibold text-slate-900 flex items-center gap-1.5">
                          <span 
                            className="h-2.5 w-2.5 rounded-full inline-block" 
                            style={{ backgroundColor: teamMembers.find(m => m.id === item.memberId)?.avatarColor }}
                          />
                          {item.memberName}
                        </td>
                        <td className="py-2 px-1 text-center font-mono text-slate-600">{item.commitsPerWeek}</td>
                        <td className="py-2 px-1 text-center font-mono font-bold text-indigo-800">{item.meetingHoursPerWeek}h</td>
                        <td className="py-2 px-1 text-center font-mono text-slate-600">{item.prReviewTimeHours}h</td>
                        <td className="py-2 px-1 text-center font-semibold text-slate-700">{item.storyPointsCompleted} pts</td>
                        <td className="py-2 px-1 text-right pr-2">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {isSelected ? 'Lendo' : 'Ver'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Metric Source citation footer */}
          <div className="flex justify-between items-center text-[9px] text-slate-400 mt-2 bg-slate-100 px-2 py-1 rounded">
            <span><strong>Fonte A:</strong> Git Commit telemetry (API GitHub Hooks)</span>
            <span><strong>Fonte B:</strong> Google Calendar Sync (API Workspace Events)</span>
          </div>
        </div>

        {/* Right Side: Detailed Diagnostic Card (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* Micro Selector List */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Colaboradores no CSV</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {teamMembers.map((m) => {
                const isSelected = selectedMemberId === m.id;
                return (
                  <button
                    key={m.id}
                    id={`btn-select-${m.id}`}
                    onClick={() => setSelectedMemberId(m.id)}
                    className={`px-1.5 py-2 text-center rounded-lg border text-xs transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs' 
                        : 'border-slate-150 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">{m.name}</div>
                    <div className="text-[8.5px] opacity-70 truncate">{m.role}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Widget */}
          <div className="bg-white border-2 border-slate-900 rounded-xl p-4 flex-1 flex flex-col justify-between relative shadow-md">
            {/* Stamp of diagnostic */}
            <div className="absolute -top-2.5 right-4 bg-slate-950 text-white text-[8px] font-mono tracking-wider font-bold px-2 py-0.5 rounded uppercase">
              Diagnóstico de Risco
            </div>

            <div className="space-y-2">
              <span className={`text-[9px] font-black border px-2 py-0.5 rounded inline-block ${diagnosis.badgeColor}`}>
                {diagnosis.title}
              </span>
              
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900">{selectedMemberDetails.name}</span>
                <span className="text-[10px] text-slate-500">• {selectedMemberDetails.role} ({selectedMemberDetails.seniority})</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {diagnosis.desc}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 mt-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs">
                <GitMerge size={14} className="text-indigo-600" />
                <span className="font-bold text-slate-800">Métricas de Gargalo:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center pt-0.5">
                <div className="bg-slate-50 border p-1 rounded">
                  <div className="text-xs font-bold font-mono text-slate-900">{selectedData.prReviewTimeHours}h</div>
                  <div className="text-[8.5px] text-slate-500 font-medium">Tempo fila de PR</div>
                </div>
                <div className="bg-slate-50 border p-1 rounded">
                  <div className="text-xs font-bold font-mono text-slate-900">{selectedData.storyPointsCompleted} pts</div>
                  <div className="text-[8.5px] text-slate-500 font-medium">Total Entregue</div>
                </div>
              </div>
              <div className="text-[10px] font-medium text-slate-600 pt-1 flex items-center gap-1.5 bg-yellow-50 p-1.5 rounded border border-yellow-200">
                <AlertCircle size={12} className="text-yellow-600 flex-shrink-0" />
                <span><strong>Impacto Operacional:</strong> {diagnosis.impact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="text-[10px] text-slate-400 flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
        <span>*Correlação estatística indica um R² de -0,81 entre Horas em Reunião e Volume de Commits de Código Sênior.</span>
        <span className="font-medium text-slate-500 text-indigo-600">Próximo: Slide 3 - Matriz de Riscos, Mitigações e Contingências</span>
      </div>
    </div>
  );
}
