import type { Semester, Module } from './types';

export function moduleFitsSemester(
  semester: Semester,
  module: Module
): boolean {
  return module.rota.includes(semester.turnus);
}

export function totalEcts(modules: Module[]): number {
  return modules.reduce((count, module) => count + module.ects, 0);
}
