import { defineStore } from "pinia";
import { useUserAccountsStore } from "./userAccounts";

export type Expense = {
    name: string,
    amount: number,
    date: string,
    userId: string,
    categoryId: string
};

type State = {
    expenses: Map<string, Expense>
}

export const useExpensesStore = defineStore({
    id: "expenses",
    state: (): State => {
        return {
            expenses: new Map<string, Expense>()
        }
    },
    getters: {
        // byUserId: (state): Map<string, Expense> => {
        //     const userStore = useUserAccountsStore();
        //     const userIds = [...userStore.userAccounts].map(([id, account]) => id);
        //     const array = [...state.expenses];
        //     const expensesByUserId = array.filter(([id, expense]) => {
        //         const matchUserId = (userId: string) => { userId === userStore.currentUser.id };
        //         console.log(`compare: ${ id }`);
        //         return userIds.some(matchUserId);
        //     });
            
        //     return new Map(expensesByUserId.map(([id, expense]) => [id, expense]));
        // },
    },
    actions: {
        createExpense(expense: Expense): void {
            this.expenses.set(`${this.expenses.size}`, expense);
        }
    }
});