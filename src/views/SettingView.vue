<script setup lang="ts">
import { useBudgetCategoriesStore, type BudgetCategory } from '@/stores/budgetCategories';
import { ref } from 'vue';

const budgetCategoriesStore = useBudgetCategoriesStore();
const testText = ref('no unko');
const testDeleteTargetText = ref('');

function OnClickTestAddCategoryButton(): void {
  const budgetTmp: BudgetCategory = { name: testText.value};
  budgetCategoriesStore.createCategory(budgetTmp);
}

function OnClickTestDeleteCategoryButton(id: string): void {
    budgetCategoriesStore.deleteCategory(id);
}
</script>

<template>
  <h1>SettingView</h1>
  
  <p>{{ testText }}</p>
  <input type="text" v-model="testText"/>
  <button @click="OnClickTestAddCategoryButton">Adding Test</button>

  <!-- <p>test delete target: {{ testDeleteTargetText }}</p>
  <input type="text" v-model="testDeleteTargetText"/>
  <button @click="OnClickTestDeleteCategoryButton">Delete Test</button> -->

  <table class="table">
    <thead>
        <tr>
          <th>Name</th>
          <th>UNKO1</th>
          <th>UNKO2</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="([key, category], index) in budgetCategoriesStore.readCategories" :key="index">
        <td>{{ category.name }}</td>
        <td>
          <button @click="OnClickTestDeleteCategoryButton(key)">{{ key }}</button>
        </td>
        <td>unko2</td>
      </tr>
    </tbody>
  </table>
</template>