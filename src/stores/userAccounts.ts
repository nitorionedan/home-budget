import { ArgumentNullError } from "@/utilities/exceptions";
import { defineStore } from "pinia";

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
    currentUser: UserAccount
};

export const useUserAccountsStore = defineStore({
    id: "userAccounts",
    state: (): State => {
        return {
            userAccounts: [] as UserAccount[],
            currentUser: {
                id: "",
                pw: "",
                name: "",
                email: "",
                expenses: [] as Expense[],
                budgetCategories: [] as BudgetCategory[]
            }
        }
    },
    getters: {
        // currentExpenses: (state) => {
        //     const expenses = [...state.currentUser.expenseMap];
        //     const budgetCategories = state.currentUser.budgetCategoryMap;
        //     const t = expenses.map(([id, expense]) => {
        //         const budgetCategory = budgetCategories.get(expense.categoryId);
        //         if (budgetCategories === undefined) {
        //             throw new Error(`予算カテゴリID${expense.categoryId}に対する予算カテゴリがありません。`);
        //         }
        //         return {expense: expense, budgetCategory: budgetCategory}
        //     });
        // },

        // currentBudgetCategories: (state): Map<string, BudgetCategory> => {
        //     if (state.currentUser.budgetCategoryMap == undefined) {
        //         state.currentUser.budgetCategoryMap = new Map<string, BudgetCategory>();
        //     }

        //     return state.currentUser.budgetCategoryMap;
        // },
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
            this.setCurrentUser("id1");

            // カテゴリ
            user1.budgetCategories.push({ id: user1.budgetCategories.length.toString(), name: "食費", userId: user1.id });
            user1.budgetCategories.push({ id: user1.budgetCategories.length.toString(), name: "交通費", userId: user1.id });
            user1.budgetCategories.push({ id: user1.budgetCategories.length.toString(), name: "雑費", userId: user1.id });

            // 支出
            user1.expenses.push({ id: user1.expenses.length.toString(), name: "買い物", amount: 100, date: "2023/4/19", userId: user1.id, categoryId: user1.budgetCategories[0].id });
            user1.expenses.push({ id: user1.expenses.length.toString(), name: "夜ご飯", amount: 200, date: "2023/4/19", userId: user1.id, categoryId: user1.budgetCategories[0].id });
            user1.expenses.push({ id: user1.expenses.length.toString(), name: "昼ご飯", amount: 300, date: "2023/4/19", userId: user1.id, categoryId: user1.budgetCategories[0].id });
        },

        setCurrentUser(userId: string): void {
            const index = this.userAccounts.findIndex((user) => user.id === userId);
            const defaultuser: UserAccount = {
                id: "",
                pw: "",
                name: "",
                email: "",
                expenses: [],
                budgetCategories: []
            };
            this.currentUser = index === -1 ? defaultuser : this.userAccounts[index];
        },

        clearAllTestData(): void {
            this.userAccounts.splice(0);
            const emptyUser: UserAccount = {
                id: "",
                pw: "",
                name: "",
                email: "",
                expenses: [],
                budgetCategories: []
            };
            this.currentUser.expenses.splice(0);
            this.currentUser.budgetCategories.splice(0);
            this.currentUser = emptyUser;
        },
    }
});