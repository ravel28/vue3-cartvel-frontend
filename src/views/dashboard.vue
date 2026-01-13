<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"


const { appContext } = getCurrentInstance();
const swal = appContext.config.globalProperties.$swal;

const categoryOptionSelect = ref([]);
const divisionUserSelect = ref([]);
const modalDetail = ref(null);
const modalItem = ref(null);
const modalQty = ref(null);
const userId = ref(Number(localStorage.getItem('idUser')));
const isUser = ref(localStorage.getItem('isUser') === 'true' ? true : false);
const titleList = ref('Daftar barang');
const mataUang = ref('Rp .');
const qty = ref(null);
const updateFormItem = ref(null);
const isGuest = ref(localStorage.getItem('isLogin') ? false : true);
import api from "./../services/api";

const items = ref([])

const itemDetail = ref({
    id: null,
    picture: null,
    price: 100,
    name: 'item 1',
    description: 'lorem cankacnkcnakckanakcaknack',
    stock: 100,
    terjual: 12 + ' Terjual'
})

const addItem = ref({
    file: null,
    price: 100,
    itemName: null,
    description: null,
    qty: null,
    categoryId: null,
    userId: userId.value
})

const updateItem = ref({
    qty: null,
    userId: null
})

const addedCart = ref({
    itemId: null,
    qty: null,
    userId: userId.value
})

// lifecycle
onMounted(async () => {
    try {
        getItems();
        const responseGetCategory = await axios.get(`${import.meta.env.VITE_API_BASE_URL}items/category`)

        categoryOptionSelect.value = responseGetCategory.data.data.map(ctg => ({
            label: ctg.category,
            value: ctg.idCategory
        }))
    } catch (error) {
        console.error('API error:', error)
    }
})

const addItemEvent = async () => {
    try {

        await axios.post(import.meta.env.VITE_API_BASE_URL + 'items/', addItem.value, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        swal.fire('Berhasil', 'Data success di simpan.', 'success');
        getItems();
    } catch (error) {
        swal.fire('Error', 'Terjadi kesalahan mendata barang.', 'error')
        router.push('/')
    }
}

const addItemToCart = async () => {
    try {
        addedQty();
    } catch (error) {
        swal.fire('Error', 'Terjadi kesalahan mendata barang.', 'error')
        router.push('/')
    }
}

const handleFile = (event) => {
    addItem.value.file = event.target.files[0]
}

async function getItems() {
    const responseGetItems = await api.get(`/items/?take=10`)
    console.log(responseGetItems.data.data)

    items.value = responseGetItems.data.data.map(item => ({
        idItem: item.idItem,
        picture: item.photo ? `${import.meta.env.VITE_API_BASE_URL}uploads/pic/${item.photo}` : '',
        name: item.itemName,
        price: item.price
    }))
}

async function getItemsById(itemId) {
    const responseGetItems = await axios.get(`${import.meta.env.VITE_API_BASE_URL}items/detail/${itemId}`)

    itemDetail.value.id = responseGetItems.data.data.id;
    itemDetail.value.picture = `${import.meta.env.VITE_API_BASE_URL}uploads/pic/${responseGetItems.data.data.photo}`;
    itemDetail.value.price = mataUang.value + responseGetItems.data.data.price;
    itemDetail.value.stock = responseGetItems.data.data.stock;
    itemDetail.value.name = responseGetItems.data.data.name;
    itemDetail.value.description = responseGetItems.data.data.description;
    itemDetail.value.terjual = responseGetItems.data.data.totalSold + ' Terjual';
}


async function isModalQty(isAddedStok) {
    if (isAddedStok) modalQty.value.classList.remove('hidden');
    if (!isAddedStok) modalQty.value.classList.add('hidden');
}

async function addedQty() {
    if (!isUser.value) {
        updateItem.value.qty = qty.value;
        updateItem.value.userId = userId.value;
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}items/stok/${itemDetail.value.id}`, updateItem.value)
        swal.fire('Berhasil', 'Data success di simpan.', 'success');
        isModal(true, itemDetail.value.id)
        isModalQty(false);
    } else {
        addedCart.value.itemId = itemDetail.value.id;
        addedCart.value.qty = qty.value;

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}carts/create`, addedCart.value);
        swal.fire('Berhasil', 'Barang tersimpan di keranjang', 'success');
        isModal(false, itemDetail.value.id)
        isModalQty(false);
    }
}

function isModal(modal, itemId) {
    if (modal) {
        modalDetail.value.classList.remove('hidden');
        getItemsById(itemId);
    } else {
        modalDetail.value.classList.add('hidden');
    }
}

function isAddItem(modal) {
    if (modal) {
        modalItem.value.classList.remove('hidden');
    } else {
        modalItem.value.classList.add('hidden');
    }
}

function selectedCategory(selectedCategory) {
    addItem.value.categoryId = selectedCategory.value;
}



</script>
<template>
    <div class="image-dashboard w-full h-max mb-6">
        <img src="/src/assets/bg/store.png" alt="" class="w-full h-100">
        <p class="text-gray-400 w-full text-center pt-2">
            Ayo berbelanja dengan hemat waktu dan tenaga
        </p>
    </div>
    <div class="dasboard-item">
        <div class="title-main pb-6" v-if="isUser">
            <h1 class="font-bold">{{ titleList }}</h1>
        </div>
        <div class="button-add-item pb-5" v-if="!isUser">
            <button class="bg-blue-500 flex py-3 px-4 rounded-lg dark:text-white cursor-pointer hover:bg-blue-400"
                @click="isAddItem(true)">
                Tambahkan Item
            </button>
        </div>
        <div class="grid grid-cols-6 gap-2">
            <div class="card p-2 border-gray-700 rounded-2xl" v-for="item in items">
                <div class="header bg-gray-400 w-full h-45 rounded-2xl mb-1">
                    <img v-if="item.picture" :src="item.picture" alt="item.name" class="item-img" />
                </div>
                <div class="body">
                    <p class="text-sm px-1">{{ item.name }}</p>
                    <p class="font-bold px-1">{{ mataUang }} {{ item.price }} </p>
                    <button
                        class="button cursor-pointer mt-2 w-full p-2 bg-blue-300 rounded-xl hover:bg-blue-200 dark:text-white"
                        @click="isModal(true, item.idItem)">Detail</button>
                </div>
            </div>
        </div>
        <div ref="modalDetail"
            class="modal-detail-item flex absolute z-10 bg-white w-5xl h-130 left-1/2 top-0 -translate-x-1/2 translate-y-1/3 rounded-3xl border border-gray-400 shadow-2xl hidden">
            <div class="side-body w-1/3 rounded-l-3xl">
                <img v-if="itemDetail.picture" :src="itemDetail.picture" alt="item.name" class="item-img h-90" />
                <span class="mx-2 font-bold">{{ itemDetail.price }}</span>
            </div>
            <div class="side-body w-2/3 pt-6">
                <div class="card w-full h-full relative">
                    <div class="header-card pb-4">
                        <h3 class="font-bold text-xl">{{ itemDetail.name }}</h3>
                    </div>

                    <div class="body-card w-full h-full">
                        <div class="detail">
                            <h4 class="font-bold">Description :</h4>
                            <p class=" h-65 text-gray-500 ">{{ itemDetail.description }}</p>
                            <p class="">Stok : {{ itemDetail.stock }}</p>
                            <p class="">({{ itemDetail.terjual }})</p>
                        </div>
                        <div class="update hidden" ref="updateFormItem">
                            <form action="#">
                            </form>
                        </div>
                    </div>
                    <div class="foot-card absolute bottom-10 flex justify-end">
                        <button v-if="!isUser && !isGuest"
                            class="button cursor-pointer bg-green-600 dark:text-white py-2 px-4 rounded-xl hover:bg-green-400"
                            @click="isModalQty(true)">
                            Tambah Stok
                        </button>
                        <button v-if="!isUser"
                            class="button cursor-pointer ms-4 bg-yellow-500 dark:text-white py-2 px-4 rounded-xl hover:bg-yellow-400 hidden">
                            Edit Item
                        </button>
                        <button v-if="isUser"
                            class="button cursor-pointer ms-4 bg-blue-800 dark:text-white py-2 px-4 rounded-xl hover:bg-blue-300"
                            @click="isModalQty(true)">
                            Tambah Ke Keranjang
                        </button>
                        <button
                            class="button cursor-pointer ms-4 bg-red-500 dark:text-white py-2 px-9 rounded-xl hover:bg-red-300"
                            @click="isModal(false)">
                            Batal</button>
                    </div>
                </div>
            </div>
        </div>
        <div ref="modalItem"
            class="modal-detail-item flex absolute z-10 bg-white w-5xl h-130 left-1/2 top-0 -translate-x-1/2 translate-y-1/3 rounded-3xl border border-gray-400 shadow-2xl hidden">
            <div class="side-body w-1/3 rounded-l-3xl">
                <div class="photo px-2 w-full h-3/4 flex justify-center items-center">
                    <img src="/src/assets/icons/photo-upload-svgrepo-com.svg" class="w-50" alt="">
                </div>
            </div>
            <div class="side-body w-2/3 pt-6">
                <div class="card w-full h-full relative">
                    <form action="#" class="w-3/4" @submit.prevent="addItemEvent">
                        <div class="header-card">
                            <h3 class="font-bold text-xl">Menambahkan Item Baru</h3>
                        </div>
                        <div class="body-card w-full h-full">
                            <div class="input block my-4">
                                <label for="" class="block mb-2">Divisi</label>
                                <div class="select relative block">
                                    <v-select :options="categoryOptionSelect" placeholder="-- Pilih Kategori --"
                                        v-model="divisionUserSelect" @update:modelValue="selectedCategory" />
                                </div>
                            </div>
                            <div class="input block my-4">
                                <label for="" class="w-full text-md">Name</label>
                                <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-2"
                                    v-model="addItem.itemName">
                            </div>
                            <div class="input block my-4">
                                <label for="" class="w-full text-md">Stok</label>
                                <input type="number" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-2"
                                    v-model="addItem.qty">
                            </div>
                            <div class="input flex my-4">
                                <div class="block w-1/2">
                                    <label for="" class="w-full text-md">Harga</label>
                                    <input type="number"
                                        class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-2"
                                        v-model="addItem.price">
                                </div>
                                <div class="block w-1/2 ps-2">
                                    <label for="" class="w-full text-md">Upload Picture</label>
                                    <input type="file" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-2"
                                        @change="handleFile">
                                </div>
                            </div>
                        </div>
                        <div class="foot-card absolute bottom-10 flex justify-end">
                            <button type="submit"
                                class="button cursor-pointer bg-blue-800 dark:text-white py-2 px-4 rounded-xl hover:bg-blue-300">
                                Upload Barang Baru
                            </button>
                            <button type="reset"
                                class="button cursor-pointer ms-4 bg-red-500 dark:text-white py-2 px-9 rounded-xl hover:bg-red-300"
                                @click="isAddItem(false)">
                                Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div ref="modalQty"
            class="modal-qty-item absolute z-10 bg-white w-xs h-45 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-gray-400 shadow-2xl hidden">
            <h2 class="font-bold text-md mt-4 text-center w-full pb-4">Jumlah Barang</h2>
            <form action="#" class="w-full flex justify-center" @submit.prevent="addItemToCart">
                <div class="input w-3/4">
                    <input type="number" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-2 mb-4"
                        v-model="qty">
                    <button
                        class="button cursor-pointer py-2 px-4 bg-green-400 dark:text-white hover:bg-green-300 rounded-2xl">Simpan</button>
                    <button type="reset"
                        class="button cursor-pointer py-2 px-4 mx-3 bg-red-500 dark:text-white hover:bg-red-300 rounded-2xl"
                        @click="isModalQty(false)">Batal</button>
                </div>
            </form>
        </div>
    </div>
</template>