<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useStringsStore, type Strings } from "@/stores/strings";
import { computed } from '@vue/reactivity';

const strings = computed((): Strings => useStringsStore().strings);
</script>

<template>
    <div class="topnav">
        <RouterLink to="/">{{ strings.topnav_list }}</RouterLink>
        <RouterLink to="chart">{{ strings.topnav_chart }}</RouterLink>
        <RouterLink to="setting">{{ strings.topnav_setting }}</RouterLink>
    </div>
</template>

<style scoped>
.topnav {
    overflow: hidden;
    background-color: #66C4D1;
    display: block;
}

.topnav > a {
    float: right;
    text-align: center;
    text-decoration: none;
    padding: 14px 16px;
    color: white;
    transition: 0.3s;
}
.topnav > a:hover {
    background-color: #3295A3;
}
</style>