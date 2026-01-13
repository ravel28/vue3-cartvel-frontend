<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"


const { appContext } = getCurrentInstance();
const swal = appContext.config.globalProperties.$swal;
const userId = ref(Number(localStorage.getItem('idUser')));
const mataUang = ref('Rp .');

const listTransaction = ref([])


onMounted(async () => {
    try {
        getTransactionList();
    } catch (error) {
        console.error('API error:', error)
    }
})

async function getTransactionList() {
    const responseGetTransaction = await axios.get(`${import.meta.env.VITE_API_BASE_URL}transaction/all/${userId.value}`);

    listTransaction.value = responseGetTransaction.data.data.map(cart => {
        const created = new Date(cart.createdAt);
        const dateOnly = new Date(created.getFullYear(), created.getMonth(), created.getDate());

        // Mengubah ke format "DD-MM-YYYY"
        const day = String(dateOnly.getDate()).padStart(2, '0');
        const month = String(dateOnly.getMonth() + 1).padStart(2, '0');
        const year = dateOnly.getFullYear();
        const dateString = `${day}-${month}-${year}`;

        return {
            date: dateString,
            total: cart.total
        };
    });

}
</script>
<template>
    <div class="list-cart block px-2">
        <div class="header py-4">
            <h4 class="font-bold">List Transaction</h4>
        </div>
        <ul class="list-none mb-10">
            <li class="flex h-20 mb-4" v-for="value in listTransaction">
                <div class="picture bg-gray-200 w-1/12 h-full">
                    <img src="/src/assets/icons/receipt-item-svgrepo-com.svg" alt="" class="w-full h-full">
                </div>
                <div class="detail-cart w-11/12 block px-3">
                    <h1 class="font-bold text-sm">{{ value.date }}</h1>
                    <p>Rp. {{ value.total }}</p>
                </div>
                <!-- <div class="qty-cart block w-1/12 text-center">
                    9 Februari 2000
                </div> -->
            </li>
        </ul>
    </div>
</template>