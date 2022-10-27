import { defineStore } from 'pinia';
import type { Module, Semester } from '../types';
import { moduleFitsSemester } from '../utils';

export const useDragStore = defineStore('drag', {
  state() {
    return {
      module: undefined as Module | undefined,
      semester: undefined as Semester | undefined
    };
  },
  getters: {
    dragging(state): boolean {
      return state.module !== undefined;
    }
  },
  actions: {
    canDrop(semester: Semester): boolean {
      return (
        this.module !== undefined && moduleFitsSemester(semester, this.module)
      );
    }
  },
  persist: false
});
