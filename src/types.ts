export interface Module {
  name: string;
  id: number;
  version: number;
  ects: number;
  graded: boolean;
  examination: string;
  language: string;
  rota: string;
  quantifier: number;
  required: boolean;
  semester: number | undefined;
}

export interface Course {
  name: string;
  type: string;
  university: string;
}

export type Turnus = 'WS' | 'SS';

export interface Semester {
  no: number;
  modules: Module[];
  turnus: Turnus;
}
