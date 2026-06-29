/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  seniority: 'Sênior' | 'Pleno' | 'Junior';
  specialty: string;
  hoursPerWeek: number;
  hourlyCost: number;
  avatarColor: string;
}

export interface RiskItem {
  id: string;
  title: string;
  description: string;
  probability: number; // 1 to 5
  impact: number; // 1 to 5
  category: 'Gargalo' | 'Silo' | 'Qualidade' | 'Integração';
  owner: string;
  immediateMitigation: string;
  contingencyTrigger: string;
  contingencyPlan: string;
}

export interface CorrelationData {
  memberId: string;
  memberName: string;
  role: string;
  commitsPerWeek: number;
  meetingHoursPerWeek: number;
  prReviewTimeHours: number;
  storyPointsCompleted: number;
}
