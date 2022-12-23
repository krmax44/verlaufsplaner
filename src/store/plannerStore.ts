import { defineStore } from 'pinia';
import type { Module, Semester, ModuleTag, PlannerStore } from '../types';
import { getModules } from '../data/university';
import { moduleFitsSemester, totalEcts } from '../utils';
import { version } from '../../package.json';

export const usePlannerStore = defineStore(`planner-${version}`, {
  state(): PlannerStore {
    return {
      version,
      isSetup: false,
      settings: {
        start: 'WS'
      },
      modules: [],
      tags: [],
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
    highestSemesterWithModule(): number {
      const chosenSemesters = this.assignedModules.map(
        (m) => m.semester as number
      );
      return Math.max(...chosenSemesters, 0);
    },
    semesters(state): Semester[] {
      const semesterCount = Math.max(
        this.highestSemesterWithModule,
        state.semesterCount,
        1
      );

      const oddSemesters = this.settings.start;
      const evenSemesters = this.settings.start === 'WS' ? 'SS' : 'WS';

      return new Array(semesterCount).fill(undefined).map((_v, i) => {
        const modules = this.assignedModules.filter(
          (m) => m.semester === i + 1
        );

        return {
          no: i + 1,
          modules,
          turnus: i % 2 === 0 ? oddSemesters : evenSemesters,
          collectedEcts: totalEcts(modules)
        };
      });
    },
    collectedEcts(): number {
      return totalEcts(this.assignedModules);
    }
  },

  actions: {
    addModule(module: Module) {
      this.modules.push({ ...module });
    },
    getModuleIndex(module: Module): number {
      return this.modules.findIndex((m) => m.id === module.id);
    },
    updateModule(id: string, module: Module) {
      const i = this.modules.findIndex((m) => m.id === id);
      if (i !== -1) {
        this.modules[i] = { ...module };
      }
    },
    removeModule(module: Module) {
      const i = this.getModuleIndex(module);
      if (i !== -1) this.modules.splice(i, 1);
    },
    getModuleById(id: string): Module | undefined {
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

    getTagById(id: string): ModuleTag | undefined {
      return this.tags.find((t) => t.id === id);
    },
    addTag(tag: ModuleTag) {
      this.tags.push({ ...tag });
    },
    getTagIndex(tag: ModuleTag): number {
      return this.tags.findIndex((m) => m.id === tag.id);
    },
    updateTag(id: string, tag: ModuleTag) {
      const i = this.tags.findIndex((m) => m.id === id);
      if (i !== -1) {
        this.tags[i] = { ...tag };
      }
    },
    removeTag(tag: ModuleTag) {
      // remove tag from tagged modules
      this.modules.forEach((m) => {
        const i = m.tags.indexOf(tag.id);
        if (i !== -1) m.tags.splice(i, 1);
      });

      // remove tag
      const i = this.getTagIndex(tag);
      if (i !== -1) this.tags.splice(i, 1);
    },
    getTagEcts(tag: string): number {
      return this.assignedModules
        .filter((m) => m.tags.includes(tag))
        .reduce((v, m) => v + m.ects, 0);
    },

    reset() {
      this.isSetup = false;
      this.modules.splice(0, this.modules.length);
      this.tags.splice(0, this.tags.length);
    },
    async setMajor(universitySlug: string, majorSlug: string) {
      const { modules, tags } = await getModules(universitySlug, majorSlug);

      this.reset();
      this.modules.push(...modules);
      this.tags.push(...tags);

      this.isSetup = true;
    },

    emptyProject() {
      this.reset();
      this.isSetup = true;
    }
  },
  persist: true
});
