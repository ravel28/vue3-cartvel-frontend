<script setup>
import { ref } from 'vue';

const headerNav = ref('CartVel');
</script>
<template>
    <div class="nav w-full h-max py-5 bg-white flex justify-between border border-gray-100 border-b-gray-300">
        <div class="title px-4 font-bold text-lg">
            {{ headerNav }}
        </div>
        <div class="sub-nav">
            <ul class="list-none flex">
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="/home/dashboard/">
                        Home
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="/home/transaction/">
                        Transaction
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="/home/cart/">
                        Cart
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="/home/profil/">
                        Profile
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="/">
                        Keluar
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>