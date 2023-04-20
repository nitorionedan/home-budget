import { defineStore } from 'pinia';

export type BudgetCategory = {
    name: string,
    userId: string
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
    createCategory(budgetCategory: BudgetCategory): void {
      this.categories.set(`${this.categories.size}`, budgetCategory);
    }
  }
});
