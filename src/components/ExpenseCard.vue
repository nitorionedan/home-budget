<script setup lang="ts">
defineProps<{
    category: string,
    name: string,
    amount: number,
    date: string
}>();
</script>

<template>
    <div class="card-frame">
        <div class="category">{{ category }}</div>
        <div class="name">{{ name }}</div>
        <div class="amount">{{ amount }}</div>
        <div class="date">{{ date }}</div>    
        <div class="delete-button">
            <button class="delete-button">🗑</button>
        </div>
    </div>
</template>

<style scoped>
.card-frame {
    width: 100%;
    background-color: #E8E8E8;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    /* margin: 15px 15px 15px 15px; */
    /* margin-right: 15px; */
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
    color: #8A8A8A;
}

.delete-button {
    text-align: right;
}
</style>