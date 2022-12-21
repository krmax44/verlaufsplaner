import _universities from './universities.json';
import type { University, Major, Module, ModuleTag } from '../types';

interface UniversityIndex {
  majors: Major[];
}

interface MajorIndex {
  modules: Module[];
  tags: ModuleTag[];
}

const majors = import.meta.glob<UniversityIndex>('./*/_index.json');
const modules = import.meta.glob<MajorIndex>([
  './*/*.json',
  '!./*/_index.json'
]);

type SparseUniversity = Omit<University, 'majors'>;

export const universities: SparseUniversity[] = _universities;

export async function getMajors(slug: string): Promise<Major[]> {
  const load = majors[`./${slug}/_index.json`];
  return (await load()).majors;
}

export async function getModules(universitySlug: string, majorSlug: string) {
  const load = modules[`./${universitySlug}/${majorSlug}.json`];
  return await load();
}
