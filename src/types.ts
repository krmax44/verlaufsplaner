export interface Module {
  name: string;
  id: string;
  ects: number;
  rota: Turnus[];
  description: string;
  url: string;
  tags: string[];
  semester: number | undefined;
}

export interface ModuleTag {
  name: string;
  id: string;
  checks: {
    minEcts?: number;
    maxEcts?: number;
  };
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

export interface PlannerStore {
  version: string;
  isSetup: boolean;
  settings: {
    start: Turnus;
  };
  modules: Module[];
  tags: ModuleTag[];
  semesterCount: number;
}
