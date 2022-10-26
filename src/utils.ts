import type { Semester, Module } from './types';

export function moduleFitsSemester(semester: Semester, module: Module) {
  return module.rota.includes(semester.turnus);
}
