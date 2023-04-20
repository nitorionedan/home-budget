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
        byUserId: (state): Map<string, Expense> => {
            const userStore = useUserAccountsStore();
            const userIds = [...userStore.userAccounts].filter(([id, account]) => id);
            console.log(`userId: ${userIds.toString()}`);
            const expensesByUserId = new Map<string, Expense>();
            const array = [...state.expenses];
            // const filtered = array.filter(([id, expense]) => {

            // });
            
            return state.expenses;
        },
    },
    actions: {
        createExpense(expense: Expense): void {
            this.expenses.set(`${this.expenses.size}`, expense);
        }
    }
});