import { defineStore } from "pinia";
import { useBudgetCategoriesStore } from "./budgetCategories";
import { useExpensesStore } from "./expenses";

export type UserAccount = {
    id: string,
    pw: string,
    name: string,
    email: string
};

type State = {
    userAccounts: Map<string, UserAccount>
};

export const useUserAccountsStore = defineStore({
    id: "userAccounts",
    state: (): State => {
        return {
            userAccounts: new Map<string, UserAccount>()
        }
    },
    getters: {
    },
    actions: {
        // テスト用データ用意
        prepareTestData(): void {
            const user1: UserAccount = { id: "id1", pw: "pw1", name: "user1", email: "user1@hoge" };
            const user2: UserAccount = { id: "id2", pw: "pw2", name: "user2", email: "user2@hoge" };
            const user3: UserAccount = { id: "id3", pw: "pw3", name: "user3", email: "user3@hoge" };
            this.userAccounts.set(user1.id, user1);
            this.userAccounts.set(user2.id, user2);
            this.userAccounts.set(user3.id, user3);

            const budgetCategoryStore = useBudgetCategoriesStore();
            let count = 0;
            this.userAccounts.forEach(account => {
                budgetCategoryStore.createCategory({ name: `category ${++count}`, userId: account.id });
            });

            const expensesStore = useExpensesStore();
            expensesStore.createExpense({ name: "expense1", amount: 100, date: "2023/4/19", userId: user1.id, categoryId: "0" });
            expensesStore.createExpense({ name: "expense2", amount: 200, date: "2023/4/20", userId: user2.id, categoryId: "1" });
            expensesStore.createExpense({ name: "expense3", amount: 300, date: "2023/4/21", userId: user3.id, categoryId: "2" });
        }        
    }
});