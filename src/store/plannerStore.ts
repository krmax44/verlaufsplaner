import { defineStore } from 'pinia';
import type { Module, Semester, Turnus, Major } from '../types';
import { getModules } from '../data/university';
import { moduleFitsSemester, totalEcts } from '../utils';
import { version } from '../../package.json';

export const usePlannerStore = defineStore(`planner-${version}`, {
  state() {
    const modules: Module[] = [];

    const settings = {
      start: 'WS' as Turnus
    };

    return {
      version,
      isSetup: false,
      settings,
      modules,
      semesterCount: 6
    };
  },

  getters: {
    assignedModules(state): Module[] {
      return state.modules.filter((m) => m.semester !== undefined);
    },
    unassignedModules(state): Module[] {
      return state.modules.filter((m) => m.semester === undefined);
    },
    highestSemesterWithModule(state): number {
      const chosenSemesters = this.assignedModules.map(
        (m) => m.semester as number
      );
      return Math.max(...chosenSemesters);
    },
    semesters(state): Semester[] {
      const semesterCount = Math.max(
        this.highestSemesterWithModule,
        state.semesterCount,
        1
      );

      const oddSemesters = this.settings.start;
      const evenSemesters = this.settings.start === 'WS' ? 'SS' : 'WS';

      return new Array(semesterCount).fill(undefined).map((_v, i) => ({
        no: i + 1,
        modules: this.assignedModules.filter((m) => m.semester === i + 1),
        turnus: i % 2 === 0 ? oddSemesters : evenSemesters
      }));
    },
    collectedEcts(): number {
      return totalEcts(this.assignedModules);
    }
  },

  actions: {
    getModuleById(id: number): Module | undefined {
      return this.modules.find((m) => m.id === id);
    },

    getSemesterByNo(no: number): Semester | undefined {
      return this.semesters[no - 1];
    },
    addSemester(): void {
      this.semesterCount++;
    },
    removeSemester(): void {
      if (this.semesterCount > 1) this.semesterCount--;
    },

    semesterHasModule(module: Module, semester: Semester): boolean {
      return module.semester === semester.no;
    },
    removeModuleFromSemester(module: Module): void {
      module.semester = undefined;
    },
    addModuleToSemester(module: Module, semester: Semester): boolean {
      if (!moduleFitsSemester(semester, module)) return false;

      module.semester = semester.no;
      return true;
    },

    async setMajor(universitySlug: string, majorSlug: string) {
      const modules = await getModules(universitySlug, majorSlug);
      this.modules.splice(0, this.modules.length);
      this.modules.push(...modules);
      this.isSetup = true;
    }
  },
  persist: true
});
