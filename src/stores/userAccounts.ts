import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export type UserAccount = {
  id: string,
  pw: string,
  name: string,
  email: string,
  expenses: Expense[],
  budgetCategories: BudgetCategory[]
};

export type Expense = {
  id: string,
  name: string,
  amount: number,
  date: string,
  userId: string,
  categoryId: string
};

export type BudgetCategory = {
  id: string,
  name: string,
  userId: string
};

type State = {
  userAccounts: UserAccount[],
  currentId: string,
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function currentUserIndex(userId: string, users: UserAccount[]): number {
  const index: number = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    throw new Error(`ユーザーID${userId}は存在しません。`);
  }

  return index;
}

export const useUserAccountsStore = defineStore({
  id: 'userAccounts',
  state: (): State => {
    return {
      userAccounts: [] as UserAccount[],
      currentId: ''
    }
  },

  getters: {
    currentExpenses: (state): Expense[] => {
      const index: number = state.userAccounts.findIndex((user) => user.id === state.currentId);

      // 支出データが存在しなければ何もしない
      if (index === -1) {
        console.log(`ユーザーID${state.currentId}は存在しません。`);
        return [];
      }
      
      return state.userAccounts[index].expenses;
    },

    currentBudgetCategories: (state): BudgetCategory[] => {
      const index: number = state.userAccounts.findIndex((user) => user.id === state.currentId);
      if (index === -1) {
        throw new Error(`ユーザーID${state.currentId}は存在しません。`);
      }
      
      return state.userAccounts[index].budgetCategories;
    },
  },

  actions: {
    // テスト用データ用意
    prepareTestData(): void {
      // アカウント
      this.userAccounts.splice(0);
      const user1: UserAccount = { id: "id1", pw: "pw1", name: "user1", email: "user1@hoge", expenses: [], budgetCategories: [] };
      const user2: UserAccount = { id: "id2", pw: "pw2", name: "user2", email: "user2@hoge", expenses: [], budgetCategories: [] };
      const user3: UserAccount = { id: "id3", pw: "pw3", name: "user3", email: "user3@hoge", expenses: [], budgetCategories: [] };
      this.userAccounts.push(user1);
      this.userAccounts.push(user2);
      this.userAccounts.push(user3);
      this.currentId = user1.id;

      // カテゴリ
      user1.budgetCategories.push({ id: user1.budgetCategories.length.toString(), name: "食費", userId: user1.id });
      user1.budgetCategories.push({ id: user1.budgetCategories.length.toString(), name: "交通費", userId: user1.id });
      user1.budgetCategories.push({ id: user1.budgetCategories.length.toString(), name: "雑費", userId: user1.id });

      // 支出
      user1.expenses.push({ id: user1.expenses.length.toString(), name: "買い物", amount: 100, date: "2023/4/19", userId: user1.id, categoryId: user1.budgetCategories[0].id });
      user1.expenses.push({ id: user1.expenses.length.toString(), name: "夜ご飯", amount: 200, date: "2023/4/19", userId: user1.id, categoryId: user1.budgetCategories[0].id });
      user1.expenses.push({ id: user1.expenses.length.toString(), name: "昼ご飯", amount: 300, date: "2023/4/19", userId: user1.id, categoryId: user1.budgetCategories[0].id });
    },

    // テスト用データすべてを削除する
    deleteAll(): void {
      // アカウントデータがなければ何もしない
      if (Array.isArray(this.userAccounts) && !this.userAccounts.length) {
        return;
      }

      // 削除処理：アカウントデータ毎の支出データ分ループ
      let expenseIdList: string[] = [];
      for (let userAccountIdx = 0; userAccountIdx < this.userAccounts.length; userAccountIdx++) {
        const expenses: Expense[] = this.userAccounts[userAccountIdx].expenses;
        for (let expenseIdx = 0; expenseIdx < expenses.length; expenseIdx++) {
          const expenseId: string = expenses[expenseIdx].id;
          expenseIdList.push(expenseId);
        }
      }
    
      for (let i = 0; i < expenseIdList.length; i++) {
        this.delete(expenseIdList[i].toString());
      }
    },
    
    // 指定した支出IDのテスト用データを削除する
    delete(expenseId: string): void {
      const index: number = currentUserIndex(this.currentId, this.userAccounts);
      const expenseIndex: number = this.userAccounts[index].expenses.findIndex((expense) => expense.id === expenseId);
      if (expenseIndex === -1) {
        console.log(`支出ID${expenseId}はすでに存在しません。`);
        return;
      }

      console.log(`支出ID${expenseId}のデータを削除します。`);
      this.userAccounts[index].expenses.splice(expenseIndex, 1);
    },
  }
});