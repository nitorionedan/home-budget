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
    },
    actions: {
        createExpense(expense: Expense): void {
            this.expenses.set(`${this.expenses.size}`, expense);
        }
    }
});