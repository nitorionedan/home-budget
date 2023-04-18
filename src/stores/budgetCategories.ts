import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export type BudgetCategory = {
    id: string,
    category: string,
};

type State = {
  categories: Map<string, BudgetCategory>
};

export const useBudgetCategoriesStore = defineStore({
  id: "budgetCategories",
  state: (): State => {
    return {
      categories: new Map<string, BudgetCategory>()
    }
  },
  getters: {
  },
  actions: {
    loadCategories() { 
    }
  }
});
