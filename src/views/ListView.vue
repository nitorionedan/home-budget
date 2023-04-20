<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserAccountsStore } from '@/stores/userAccounts';
import { useBudgetCategoriesStore } from "@/stores/budgetCategories";
import { useExpensesStore } from "@/stores/expenses";

const userAccountsStore = useUserAccountsStore();
const budgetCategoriesStore = useBudgetCategoriesStore();
const expensesSotre = useExpensesStore();
const expenses = computed(() => expensesSotre.byUserId);

function createTestData(): void {
    userAccountsStore.prepareTestData();
}
</script>

<template>
    <h1>ListView</h1>
    <ul>
        <li v-for="[id, account] in userAccountsStore.userAccounts" :key="id">
            {{ account }}
        </li>
        <li v-for="[id, budgetCategories] in budgetCategoriesStore.categories" :key="id">
            {{ budgetCategories }}
        </li>
        <li v-for="[id, expense] in expenses" :key="id">
            {{ expense }}
        </li>
    </ul>
    <button @click="createTestData">サンプルデータ追加</button>
</template>