export interface Module {
  name: string;
  id: number;
  ects: number;
  rota: Turnus[];
  description: string;
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
  collectedEcts: number;
}

export interface University {
  name: string;
  otherNames: string[];
  slug: string;
  majors: Major[];
}

export interface Major {
  name: string;
  type: string;
  standardPeriod: number;
  slug: string;
}
