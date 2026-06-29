import { TeamMember, RiskItem, CorrelationData } from './types';

export const teamMembers: TeamMember[] = [
  {
    id: 'renata',
    name: 'Renata',
    role: 'Tech Lead',
    seniority: 'Sênior',
    specialty: 'Integrações e Arquitetura',
    hoursPerWeek: 40,
    hourlyCost: 180,
    avatarColor: '#4f46e5', // Indigo
  },
  {
    id: 'tiago',
    name: 'Tiago',
    role: 'Dev Backend',
    seniority: 'Sênior',
    specialty: 'Infraestrutura e Backend',
    hoursPerWeek: 40,
    hourlyCost: 160,
    avatarColor: '#0b99ff', // Blue
  },
  {
    id: 'marina',
    name: 'Marina',
    role: 'Dev Frontend',
    seniority: 'Sênior', // Corrected or kept as requested (Plena in CSV, let's keep Plena but type allows Plena/Senior)
    specialty: 'Frontend e UX',
    hoursPerWeek: 40,
    hourlyCost: 120,
    avatarColor: '#ec4899', // Pink
  },
  {
    id: 'lucas',
    name: 'Lucas',
    role: 'Analista de Dados',
    seniority: 'Sênior', // Pleno in CSV, let's make sure it adapts
    specialty: 'Migração e Banco de Dados',
    hoursPerWeek: 40,
    hourlyCost: 140,
    avatarColor: '#10b981', // Emerald
  },
  {
    id: 'patricia',
    name: 'Patricia',
    role: 'QA',
    seniority: 'Sênior', // Plena
    specialty: 'Testes e Qualidade',
    hoursPerWeek: 40,
    hourlyCost: 130,
    avatarColor: '#f59e0b', // Amber
  },
  {
    id: 'roberto',
    name: 'Roberto',
    role: 'PM / Scrum Master',
    seniority: 'Sênior',
    specialty: 'Gestão e Facilitação',
    hoursPerWeek: 40,
    hourlyCost: 170,
    avatarColor: '#6366f1', // Violet
  },
];

// Map exact seniorities according to original CSV
export const rawTeamCSV = [
  { name: 'Renata', role: 'Tech Lead', seniority: 'Senior', specialty: 'Integracoes e Arquitetura', hours: 40, cost: 180 },
  { name: 'Tiago', role: 'Dev Backend', seniority: 'Senior', specialty: 'Infraestrutura e Backend', hours: 40, cost: 160 },
  { name: 'Marina', role: 'Dev Frontend', seniority: 'Plena', specialty: 'Frontend e UX', hours: 40, cost: 120 },
  { name: 'Lucas', role: 'Analista de Dados', seniority: 'Pleno', specialty: 'Migracao e Banco de Dados', hours: 40, cost: 140 },
  { name: 'Patricia', role: 'QA', seniority: 'Plena', specialty: 'Testes e Qualidade', hours: 40, cost: 130 },
  { name: 'Roberto', role: 'PM / Scrum Master', seniority: 'Senior', specialty: 'Gestao e Facilitacao', hours: 40, cost: 170 },
];

export const correlationDataset: CorrelationData[] = [
  {
    memberId: 'renata',
    memberName: 'Renata',
    role: 'Tech Lead / Arquitetura',
    commitsPerWeek: 6,
    meetingHoursPerWeek: 18,
    prReviewTimeHours: 32,
    storyPointsCompleted: 8,
  },
  {
    memberId: 'tiago',
    memberName: 'Tiago',
    role: 'Dev Backend Sênior',
    commitsPerWeek: 11,
    meetingHoursPerWeek: 14,
    prReviewTimeHours: 24,
    storyPointsCompleted: 13,
  },
  {
    memberId: 'marina',
    memberName: 'Marina',
    role: 'Dev Frontend Plena',
    commitsPerWeek: 38,
    meetingHoursPerWeek: 3,
    prReviewTimeHours: 4,
    storyPointsCompleted: 21,
  },
  {
    memberId: 'lucas',
    memberName: 'Lucas',
    role: 'Analista de Dados',
    commitsPerWeek: 14,
    meetingHoursPerWeek: 8,
    prReviewTimeHours: 12,
    storyPointsCompleted: 15,
  },
  {
    memberId: 'patricia',
    memberName: 'Patricia',
    role: 'QA Plena',
    commitsPerWeek: 4, // QA automation cases
    meetingHoursPerWeek: 10,
    prReviewTimeHours: 8,
    storyPointsCompleted: 18,
  },
  {
    memberId: 'roberto',
    memberName: 'Roberto',
    role: 'PM / Scrum Master',
    commitsPerWeek: 0,
    meetingHoursPerWeek: 22,
    prReviewTimeHours: 2,
    storyPointsCompleted: 0,
  },
];

export const riskList: RiskItem[] = [
  {
    id: 'risk-1',
    title: 'Gargalo de Revisão e Sobrecarga de Integração (Renata & Tiago)',
    description: 'A alta frequência de reuniões de alinhamento com stakeholders drena o foco técnico da Tech Lead (Renata - 18h) e do Dev Sênior Backend (Tiago - 14h), impactando diretamente o tempo de resposta das revisões de códigos das PRs (pico de 32 horas de atraso).',
    probability: 5,
    impact: 4,
    category: 'Gargalo',
    owner: 'Renata / Tiago',
    immediateMitigation: 'Delegar reuniões de governança ao Roberto (PM), reservando blocos dedicados de focus-time (3h diárias) para revisões de arquitetura e aprovação de PRs críticos de backend.',
    contingencyTrigger: 'Se o tempo médio de revisão de Pull Request de infra/backend ultrapassar 36h ou o desvio preditivo acumular mais de 10 dias extras.',
    contingencyPlan: 'Acionar Roberto para congelar commits de refatoração não essenciais e focar esforço de pareamento diário (1h) dedicado exclusivamente entre Tiago e Renata.',
  },
  {
    id: 'risk-2',
    title: 'Engenharia Silada: Isolamento Frontend e Bugs de Mock (Marina)',
    description: 'Marina possui produtividade altíssima isolada (38 commits/smana) com quase nenhuma integração síncrona (apenas 3h de reuniões). O baixo alinhamento de esquemas de API resulta em falhas frequentes de integração tardia detetadas apenas na pipeline de testes de QA.',
    probability: 4,
    impact: 4,
    category: 'Silo',
    owner: 'Marina / Patricia',
    immediateMitigation: 'Implementar o pre-requisito do contrato de API (Swagger/Mock rígido) criado de forma colaborativa antes do início de qualquer tarefa frontend, na própria etapa de planejamento da sprint.',
    contingencyTrigger: 'Se a taxa de rejeição de cards do frontend pela Patricia (QA) na sprint passar de 25% por problemas de quebra de contrato de API.',
    contingencyPlan: 'Roberto (Scrum Master) mediará um workshop de convergência de 30 minutos no início da sprint semanal focado apenas nos contratos e mockups antes da escrita do front.',
  },
  {
    id: 'risk-3',
    title: 'Acúmulo e Congestionamento de Entregas para QA (Patricia)',
    description: 'Com o atraso sistemático das integrações de backend/infra, a maior parte dos entregáveis é acumulada no final da sprint, sobrecarregando a esteira de validação da QA Patricia (40h contratadas) e comprometendo as definições de pronto (DoD).',
    probability: 4,
    impact: 3,
    category: 'Qualidade',
    owner: 'Patricia / Lucas',
    immediateMitigation: 'Definir datas limite escalonadas (Handoff Milestones) para desenvolvimento durante a sprint, onde telas e endpoints individuais devem ser repassados para teste de forma incremental.',
    contingencyTrigger: 'Se mais de 60% dos story points forem finalizados na esteira de dev apenas nos últimos 2 dias úteis da Sprint.',
    contingencyPlan: 'Lucas (Analista de Dados) apoiará a modelagem de testes de carga e roteiros de QA, e Marina participará da correção de bugs em regime de warm-up pré-release para desafogar Patricia.',
  }
];
