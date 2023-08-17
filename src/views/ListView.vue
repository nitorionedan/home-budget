<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserAccountsStore } from '@/stores/userAccounts';
import ExpenseCard from '@/components/ExpenseCard.vue';

const usersStore = useUserAccountsStore();
const expenses = computed(() => usersStore.currentExpenses);
const budgetCategories = computed(() => usersStore.currentBudgetCategories);

function budgetCategoryNameById(categoryId: string): string {
    const index = budgetCategories.value.findIndex((category) => category.id === categoryId);
    if (index === -1) {
        console.log(`予算カテゴリID（${categoryId}）がみつかりません。`);
        return "";
    }

    return budgetCategories.value[index].name;
}

function createTestData(): void {
    usersStore.prepareTestData();
}

function clearAllUserDatas(): void {
    usersStore.clearAllTestData();
}

createTestData();
</script>

<template>
    <button @click="createTestData">サンプルデータ追加</button>
    <button @click="clearAllUserDatas">サンプルデータ削除</button>
    <div v-if="expenses.length > 0">
        <div class="row">
            <div class="col-3" v-for="(expense, id) in expenses" :key="id">
                <ExpenseCard :expense-id="expense.id" :category-name="budgetCategoryNameById(expense.categoryId)" :name="expense.name" :amount="expense.amount" :date="expense.date"></ExpenseCard>
            </div>
        </div>
    </div>
    <div v-else>
        <p>データはありません。</p>
    </div>
</template>

<style scoped>
.row::after {
  content: "";
  clear: both;
  display: block;
}

[class*="col-"] {
  float: left;
  padding: 8px 15px;
}

/* For desktop: */
.col-12 {width: 8.33%;}
.col-6 {width: 16.66%;}
.col-5 {width: 20%;}
.col-4 {width: 25%;}
.col-3 {width: 33.33%;}
.col-2 {width: 50%;}
.col-1 {width: 100%;}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }
}
</style>