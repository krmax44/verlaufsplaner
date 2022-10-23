import { defineStore } from 'pinia';
import informatik from '../data/tuberlin/informatik-bsc.json';
import { Module, Semester } from '../types';

export const usePlannerStore = defineStore('planner', {
  state() {
    const modules: Module[] = informatik.modules;
    const _semesters = [{ modules: [] as Module[] }];

    return {
      modules,
      _semesters
    };
  },

  getters: {
    assignedModules(state): Module[] {
      return state._semesters.map((s) => s.modules).flat();
    },
    unassignedModules(state): Module[] {
      const assignedModules = this.assignedModules;
      return state.modules.filter((m) => !assignedModules.includes(m));
    },
    semesters(state): Semester[] {
      return state._semesters.map((s, i) => ({
        ...s,
        no: i + 1,
        turnus: i % 2 === 0 ? 'WS' : 'SS'
      }));
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
      this._semesters.push({ modules: [] });
    },

    semesterHasModule(semester: Semester, module: Module): boolean {
      return semester.modules.find((m) => m.id === module.id) !== undefined;
    },
    removeModuleFromSemester(semester: Semester, module: Module): void {
      const i = semester.modules.findIndex((m) => m.id === module.id);
      if (i !== -1) semester.modules.splice(i, 1);
    },
    addModuleToSemester(semester: Semester, module: Module): boolean {
      if (!module.rota.includes(semester.turnus)) return false;

      const owner = this.semesters.find((s) =>
        this.semesterHasModule(s, module)
      );
      if (owner !== undefined) {
        this.removeModuleFromSemester(semester, module);
      }

      semester.modules.push(module);
      return true;
    }
  }
});
