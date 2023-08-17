<script setup lang="ts">
import { useUserAccountsStore } from "@/stores/userAccounts";

const props = defineProps<{
    categoryName: string,
    expenseId: string,
    name: string,
    amount: number,
    date: string
}>();

const userStore = useUserAccountsStore();

function deleteExpense(): void {
    console.log("消す: " + props.expenseId);
    userStore.deleteExpense(props.expenseId);

}
</script>

<template>
    <div class="card-frame">
        <div class="category">{{ categoryName }}</div>
        <div class="name">{{ name }}</div>
        <div class="amount">{{ amount }}</div>
        <div class="date">{{ date }}</div>    
        <div class="delete-button">
            <button class="delete-button" @click="deleteExpense">🗑</button>
        </div>
    </div>
</template>

<style scoped>
.card-frame {
    width: 100%;
    border: solid 1px var(--white);
    transition: 0.3s;
}

.card-frame:hover {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    cursor: pointer;
}

.category {
    /* border: solid 1px black; */
    text-align: center;
}

.name {
    text-align: center;
}

.amount {
    text-align: center;
}

.date {
    text-align: center;
    color: var(--color-text-subtitle);
}

.delete-button {
    text-align: right;
}
</style>