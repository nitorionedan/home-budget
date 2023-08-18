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

// UserAccount Store
export const useUserAccountsStore = defineStore({
  id: 'userAccounts',
  state: (): State => {
    return {
      userAccounts: [] as UserAccount[],
      currentId: ''
    }
  },

  getters: {
    // Expenses list
    currentExpenses: (state): Expense[] => {
      const index: number = state.userAccounts.findIndex((user) => user.id === state.currentId);

      // 支出データが存在しなければ何もしない
      if (index === -1) {
        console.log(`ユーザーID${state.currentId}は存在しません。`);
        return [];
      }
      
      return state.userAccounts[index].expenses;
    },

    // BudgetCategory list
    currentBudgetCategories: (state): BudgetCategory[] => {
      const index: number = state.userAccounts.findIndex((user) => user.id === state.currentId);

      // カテゴリーがなければ何もしない
      if (index === -1) {
        console.log(`ユーザーID${state.currentId}は存在しません。`);
        return [];
      }
      
      return state.userAccounts[index].budgetCategories;
    },
  },

  actions: {
    // DEBUG: テスト用データ用意
    prepareTestData(): void {
      // アカウント
      // 一旦アカウントデータを削除する
      this.userAccounts.splice(0);
      this.createUserAccount({ 
        id: 'id1', 
        pw: 'pw1', 
        name: 'user1', 
        email: 'user1@hoge', 
        expenses: [], 
        budgetCategories: []
      });
      this.createUserAccount({ 
        id: 'id2', 
        pw: 'pw2', 
        name: 'user2', 
        email: 'user2@hoge', 
        expenses: [], 
        budgetCategories: [] 
      });
      this.createUserAccount({ 
        id: 'id3', 
        pw: 'pw3', 
        name: 'user3', 
        email: 'user3@hoge', 
        expenses: [], 
        budgetCategories: [] 
      });

      // カテゴリ
      const userAccountIdx: number = 
        this.userAccounts.findIndex((userAccount) => userAccount.id === this.currentId);
      const userAccount: UserAccount = this.userAccounts[userAccountIdx];

      this.createBudgetCategory({ 
        id: `bc${this.currentBudgetCategories.length}`,
        name: '食費', 
        userId: userAccount.id
      });
      this.createBudgetCategory({ 
        id: `bc${this.currentBudgetCategories.length}`,
        name: '交通費', 
        userId: userAccount.id
      });
      this.createBudgetCategory({ 
        id: `bc${this.currentBudgetCategories.length}`,
        name: '雑費', 
        userId: userAccount.id
      });

      // 支出
      this.createExpense({ 
        id: `bc${this.currentExpenses.length}`,
        name: '買い物', 
        amount: 100, 
        date: '2023/4/19', 
        userId: this.currentId,
        categoryId: userAccount.budgetCategories[0].id 
      });
      this.createExpense({ 
        id: `bc${this.currentExpenses.length}`,
        name: '夜ご飯', 
        amount: 200, 
        date: '2023/4/19', 
        userId: this.currentId,
        categoryId: userAccount.budgetCategories[0].id 
      });
      this.createExpense({ 
        id: `bc${this.currentExpenses.length}`,
        name: '昼ご飯', 
        amount: 300, 
        date: '2023/4/19', 
        userId: this.currentId,
        categoryId: userAccount.budgetCategories[0].id 
      });
    },

    // ユーザーアカウントデータ作成
    createUserAccount(newUserAccount: UserAccount): void {
      this.userAccounts.push(newUserAccount);

      // DEBUG: 追加したアカウントのIDを現在のIDに設定する
      this.currentId = newUserAccount.id;
    },

    // 支出データの作成
    createExpense(expense: Expense): void {
      // アカウントデータがなければ何もしない
      if (Array.isArray(this.userAccounts) && !this.userAccounts.length) {
        return;
      } 

      // 支出データ追加
      // let userAccount = this.userAccounts[parseInt(this.currentId)];
      const userAccountIdx: number = 
      this.userAccounts.findIndex((userAccount) => userAccount.id === this.currentId);
      let userAccount: UserAccount = this.userAccounts[userAccountIdx];
      userAccount.expenses.push(expense);
    },

    // 予算カテゴリーの作成
    createBudgetCategory(budgetCategory: BudgetCategory): void {
      // アカウントデータがなければ何もしない
      if (Array.isArray(this.userAccounts) && !this.userAccounts.length) {
        return;
      }

      // 予算カテゴリー追加
      // let userAccount = this.userAccounts[parseInt(this.currentId)];
      const userAccountIdx: number = 
      this.userAccounts.findIndex((userAccount) => userAccount.id === this.currentId);
      let userAccount: UserAccount = this.userAccounts[userAccountIdx];
      userAccount.budgetCategories.push(budgetCategory);
    },

    // テスト用データすべてを削除する
    deleteAll(): void {
      // アカウントデータがなければ何もしない
      if (Array.isArray(this.userAccounts) && !this.userAccounts.length) {
        return;
      }

      // 削除前処理：アカウントデータ毎の支出データのIDを収集
      let expenseIdList: string[] = [];
      for (let userAccountIdx = 0; userAccountIdx < this.userAccounts.length; userAccountIdx++) {
        const expenses: Expense[] = this.userAccounts[userAccountIdx].expenses;
        for (let expenseIdx = 0; expenseIdx < expenses.length; expenseIdx++) {
          const expenseId: string = expenses[expenseIdx].id;
          expenseIdList.push(expenseId);
        }
      }
    
      // 削除処理：全支出データを削除
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