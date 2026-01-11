<script setup>
import { ref } from 'vue';

const items = ref([
    {
        picture: '',
        name: 'Laptop',
        price: 500
    },
    {
        picture: '',
        name: 'Monitor',
        price: 900
    },
    {
        picture: '',
        name: 'Mouse',
        price: 30
    }
])

const itemDetail = ref({
    picture: null,
    price: 100,
    name: 'item 1',
    description: 'lorem cankacnkcnakckanakcaknack',
    stock: 100,
    terjual: 12 + ' Terjual'
})

const addItem = ref({
    picture: null,
    price: 100,
    name: null,
    description: null,
    stock: null,
})

const modalDetail = ref(null);
const modalItem = ref(null);

function isModal(modal) {
    if (modal) {
        modalDetail.value.classList.remove('hidden');
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
</script>
<template>
    <div class="image-dashboard w-full h-max mb-6">
        <img src="/src/assets/bg/store.png" alt="" class="w-full h-100">
        <p class="text-gray-400 w-full text-center pt-2">
            Ayo berbelanja dengan hemat waktu dan tenaga
        </p>
    </div>
    <div class="dasboard-item">
        <div class="title-main pb-6">
            <h1 class="font-bold">{{ titleList }}</h1>
        </div>
        <div class="button-add-item pb-5">
            <button class="bg-blue-500 flex py-3 px-4 rounded-lg dark:text-white cursor-pointer hover:bg-blue-400"
                @click="isAddItem(true)">
                Tambahkan Item
            </button>
        </div>
        <div class="grid grid-cols-6 gap-2">
            <div class="card p-2 border-gray-700 rounded-2xl" v-for="item in items">
                <div class="header bg-gray-400 w-full h-45 rounded-2xl mb-1">

                </div>
                <div class="body">
                    <p class="text-sm px-1">{{ item.name }}</p>
                    <p class="font-bold px-1">$ {{ item.price }} </p>
                    <button
                        class="button cursor-pointer mt-2 w-full p-2 bg-blue-300 rounded-xl hover:bg-blue-200 dark:text-white"
                        @click="isModal(true)">Detail</button>
                </div>
            </div>
        </div>
        <div ref="modalDetail"
            class="modal-detail-item flex absolute z-10 bg-white w-5xl h-130 left-1/2 top-0 -translate-x-1/2 translate-y-1/3 rounded-3xl border border-gray-400 shadow-2xl hidden">
            <div class="side-body w-1/3 rounded-l-3xl">

            </div>
            <div class="side-body w-2/3 pt-6">
                <div class="card w-full h-full relative">
                    <div class="header-card">
                        <h3 class="font-bold text-xl">{{ itemDetail.name }}</h3>
                    </div>
                    <div class="body-card w-full h-full">
                        <p class=" h-65 text-gray-500 ">{{ itemDetail.description }}</p>
                        <p class="">{{ itemDetail.terjual }}</p>
                    </div>
                    <div class="foot-card absolute bottom-10 flex justify-end">
                        <button
                            class="button cursor-pointer bg-green-600 dark:text-white py-2 px-4 rounded-xl hover:bg-green-400">
                            Tambah Stok
                        </button>
                        <button
                            class="button cursor-pointer ms-4 bg-blue-800 dark:text-white py-2 px-4 rounded-xl hover:bg-blue-300">
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
                    <div class="header-card">
                        <h3 class="font-bold text-xl">Menambahkan Item Baru</h3>
                    </div>
                    <div class="body-card w-full h-full">
                        <form action="#" class="w-3/4">
                            <div class="input block my-4">
                                <label for="" class="w-full text-md">Name</label>
                                <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl">
                            </div>
                            <div class="input block my-4">
                                <label for="" class="w-full text-md">Stok</label>
                                <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl">
                            </div>
                            <div class="input flex my-4">
                                <div class="block w-1/2">
                                    <label for="" class="w-full text-md">Harga</label>
                                    <input type="number" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl">
                                </div>
                                <div class="block w-1/2 ps-2">
                                    <label for="" class="w-full text-md">Upload Picture</label>
                                    <input type="file" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="foot-card absolute bottom-10 flex justify-end">
                        <button
                            class="button cursor-pointer bg-blue-800 dark:text-white py-2 px-4 rounded-xl hover:bg-blue-300">
                            Upload Barang Baru
                        </button>
                        <button
                            class="button cursor-pointer ms-4 bg-red-500 dark:text-white py-2 px-9 rounded-xl hover:bg-red-300"
                            @click="isAddItem(false)">
                            Batal</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>