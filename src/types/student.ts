export interface Student {
  id: string;
  name: string;
  class: string;
  idNumber: string;
  citizenship: string;
  powerScore: number;
  attendance: string;
  status: string;
  grade?: number | string;
  age?: number;
  email?: string;
  phone?: string;
  address?: string;
  parent?: string;
  aiFlag?: boolean | string;
  avatar?: string;
  boarded?: boolean;
  comment?: string;
  consent?: boolean;
  date?: string;
  engagement?: number;
  final?: boolean | string;
  paid?: boolean;
  qrStatus?: string;
  score?: number | string;
  scores?: any;
}
