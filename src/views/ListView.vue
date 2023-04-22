<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserAccountsStore } from '@/stores/userAccounts';
import ExpenseCard from '@/components/ExpenseCard.vue';

const usersStore = useUserAccountsStore();
const expenses = computed(() => usersStore.currentUser.expenses);
const budgetCategories = computed(() => usersStore.currentUser.budgetCategories);

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
    usersStore.setCurrentUser("id1");
}

function clearAllUserDatas(): void {
    usersStore.clearAllTestData();
}
</script>

<template>
    <button @click="createTestData">サンプルデータ追加</button>
    <button @click="clearAllUserDatas">サンプルデータ削除</button>
    <div v-if="usersStore.currentUser.expenses.length > 0">
        <div class="row">
            <div class="col-12" v-for="(expense, id) in expenses" :key="id">
                <ExpenseCard :category="budgetCategoryNameById(expense.categoryId)" :name="expense.name" :amount="expense.amount" :date="expense.date"></ExpenseCard>
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
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }
}
</style>