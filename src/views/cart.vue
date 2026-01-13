<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"


const { appContext } = getCurrentInstance();
const swal = appContext.config.globalProperties.$swal;
const userId = ref(Number(localStorage.getItem('idUser')));
const mataUang = ref('Rp .');
const total = ref(null);
const isCheckout = ref(false);

const listCart = ref([
    {
        idCart: null,
        picture: null,
        name: null,
        price: null,
        subPrice: null,
        total: null,
        qty: 0,
        itemId: null,
        userId: userId.value

    }
])

onMounted(async () => {
    try {
        getCart();
    } catch (error) {
        console.error('API error:', error)
    }
})


async function checkout() {
    try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}transaction/create`, listCart.value);
        swal.fire('Berhasil', 'Semua banrang sudah dicheckout.', 'success')
        getCart();
    } catch (error) {
        swal.fire('Error', 'Terjadi kesalahan mendata barang.', 'error')
        router.push('/')
    }
}

async function updateCart(idCart, isPlus) {
    if (isPlus) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}carts/update/add/${idCart}`);
    } else {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}carts/update/minus/${idCart}`);
    }
    getCart();
}

async function getCart() {
    const responseGetCart = await axios.get(`${import.meta.env.VITE_API_BASE_URL}carts/view/${userId.value}`);

    listCart.value = responseGetCart.data.data.map(cart => ({
        idCart: cart.idCart,
        picture: `${import.meta.env.VITE_API_BASE_URL}uploads/pic/${cart.photo}`,
        name: cart.itemName,
        subPrice: mataUang.value + cart.price,
        price: cart.price,
        qty: cart.qtyCart,
        subTotal: 'Sub-total : Rp. ' + cart.total,
        total: cart.total,
        userId: userId.value,
        itemId: cart.itemId
    }))


    total.value = 0;

    if (listCart.value.length > 0) {
        total.value = listCart.value.map(itemCart => itemCart.total).reduce((itemCart, sum) => itemCart + sum)
        isCheckout.value = true;
    }
}
</script>
<template>
    <div class="list-cart block px-2">
        <div class="header py-4">
            <h4 class="font-bold">List Cart</h4>
        </div>
        <ul class="list-none mb-10">
            <li class="flex h-20 mb-4" v-for="cartValue in listCart">
                <div class="picture bg-gray-200 w-1/12 h-full">
                    <img v-if="cartValue.picture" :src="cartValue.picture" alt="item.name"
                        class="item-img h-full w-full" />
                </div>
                <div class="detail-cart w-9/12 block px-3">
                    <h1 class="font-bold text-sm">{{ cartValue.name }}</h1>
                    <p>{{ cartValue.subPrice }}</p>
                    <p>{{ cartValue.subTotal }}</p>
                </div>
                <div class="qty-cart block w-2/12 text-center">
                    <label class="text-center w-full py-2 font-bold text-sm">QTY</label>
                    <div class="input-qty flex justify-center">
                        <div class="update-cart-minus flex justify-center items-center mx-1 cursor-pointer"
                            @click="updateCart(cartValue.idCart, false)">
                            <img src="/src/assets/icons/minus-square-svgrepo-com.svg" class="w-6 h-6" alt="">
                        </div>
                        <input type="number" name="qty" class="outline-gray-300 w-15 border rounded-sm text-center"
                            readonly='true' v-model="cartValue.qty">
                        <div class="update-cart-minus flex justify-center items-center mx-1 cursor-pointer"
                            @click="updateCart(cartValue.idCart, true)">
                            <img src="/src/assets/icons/plus-square-svgrepo-com.svg" class="w-6 h-6" alt="">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="w-full flex justify-between mb-10">
            <span class="font-bold">Total</span>
            <span class="mx-3">Rp. {{ total }}</span>
        </div>
        <div class="checkout" @click="checkout()" v-if="isCheckout">
            <button class="button py-3 px-4 bg-green-500 dark:text-white rounded-lg cursor-pointer hover:bg-green-400">
                Checkout
            </button>
        </div>
    </div>
</template>