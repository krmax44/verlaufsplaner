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

export function randomString(length = 20): string {
  // adapted from https://stackoverflow.com/a/27747377/12790535
  // CC-BY-SA 4.0 Mulan
  const arr = window.crypto.getRandomValues(new Uint8Array(length / 2));
  return Array.from(arr, (dec) => dec.toString(16).padStart(2, '0')).join('');
}
