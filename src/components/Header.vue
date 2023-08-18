<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useStringsStore, type Strings } from "@/stores/strings";
import { computed } from '@vue/reactivity';

const strings = computed((): Strings => useStringsStore().strings);
</script>

<template>
    <div class="topnav">
        <RouterLink to="setting">{{ strings.topnav_setting }}</RouterLink>
        <RouterLink to="chart">{{ strings.topnav_chart }}</RouterLink>
        <RouterLink to="/">{{ strings.topnav_list }}</RouterLink>
    </div>
</template>

<style scoped>
.topnav {
    overflow: hidden;
    background-color: var(--color-primary);
    display: block;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    width: 100%;
    margin-bottom: 10px;
    padding: 0;
    /* position: fixed; */
}

.topnav > a {
    float: right;
    text-align: center;
    text-decoration: none;
    padding: 16px;
    color: var(--white);
    transition: 0.3s;
}

.topnav > a:hover {
    background-color: var(--color-accent);
}
</style>