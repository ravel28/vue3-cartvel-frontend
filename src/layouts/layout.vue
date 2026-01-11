<script setup>
import HeaderLayout from '../components/headers/header.vue';
import MainBoard from '../views/dashboard.vue';

</script>
<template>
    <div class="contain relative w-7xl h-full">
        <HeaderLayout></HeaderLayout>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>