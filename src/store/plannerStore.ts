import { defineStore } from 'pinia';
import type { Module, Semester, Turnus } from '../types';
import informatik from '../data/tuberlin/informatik-bsc.json';
import { moduleFitsSemester, totalEcts } from '../utils';
import { version } from '../../package.json';

export const usePlannerStore = defineStore(`planner-${version}`, {
  state() {
    const modules: Module[] = informatik.modules.map((m) => ({
      ...m,
      semester: undefined
    }));

    const settings = {
      start: 'WS' as Turnus
    };

    return {
      version,
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
    }
  },
  persist: true
});
