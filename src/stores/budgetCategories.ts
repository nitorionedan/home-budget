import { defineStore } from 'pinia';

export type BudgetCategory = {
  name: string
};

type State = {
  categories: Map<string, BudgetCategory>
};

// Budget Category Store
export const useBudgetCategoriesStore = defineStore('budgetCategories', {
  state: (): State => {
    return {
      categories: new Map<string, BudgetCategory>()
    }
  },
  getters: {
    readCategories(): Map<string, BudgetCategory> {
      return this.categories;
    }
  },
  actions: {
    // カテゴリー新規作成
    createCategory(budgetCategory: BudgetCategory): void {
      this.categories.set(`${this.categories.size}`, budgetCategory);
    },

    // カテゴリー情報を更新
    updateCategory(id: string, name: string): boolean {      
      // 存在しないIDが与えられていれば存在しないことを伝え、何もしない。
      const notFound = !this.categories.has(id);
      if (notFound) {
        console.log(`id(${id})は存在しません。`);
        return false;
      }

      // カテゴリーの情報を更新
      const newCategory: BudgetCategory = {name: name};
      const oldName: string | undefined = this.categories.get(id)?.name;
      this.categories.set(id, newCategory);
      console.log(`id(${id})のname(${oldName})を${newCategory.name}へ変更しました。`);
      return true;
    },

    // 1件、カテゴリーデータを削除
    deleteCategory(id: string): boolean {
      // 存在しないIDが与えられていれば存在しないことを伝え、何もしない。
      const notFound = !this.categories.has(id);
      if (notFound) {
        console.log(`id(${id})は存在しません。`);
        return false;
      }

      this.categories.delete(id);
      console.log(`id(${id})のカテゴリーを削除しました。`);
      return true;
    },

    // 全件、カテゴリーデータを削除
    deleteAllCategories(): boolean {
      this.categories.clear();
      console.log('すべてのカテゴリーデータを削除しました。');
      return true;
    },
  }
});
