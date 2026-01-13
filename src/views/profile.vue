<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"

const { appContext } = getCurrentInstance();
const swal = appContext.config.globalProperties.$swal;

const userId = ref(Number(localStorage.getItem('idUser')));
const detailUser = ref({
    email: null,
    name: null,
    phoneNumber: null,
    address: null
})

const changePass = ref({
    oldPass: null,
    newPass: null
})

onMounted(async () => {
    try {
        const responseGetUser = await axios.get(`${import.meta.env.VITE_API_BASE_URL}users/detail/${userId.value}`)

        detailUser.value.email = responseGetUser.data.data.email;
        detailUser.value.name = responseGetUser.data.data.name;
        detailUser.value.phoneNumber = responseGetUser.data.data.phone;
        detailUser.value.address = responseGetUser.data.data.address;
    } catch (error) {
        console.error('API error:', error)
    }
})


const update = async () => {
    try {
        await axios.put(import.meta.env.VITE_API_BASE_URL + `users/update/${userId.value}`, detailUser.value, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        swal.fire('Berhasil', 'Data success di simpan.', 'success');
    } catch (error) {
        swal.fire('Error', 'Terjadi kesalahan update', 'error')
        router.push('/')
    }
}

const updatePassUser = async () => {
    try {
        await axios.put(import.meta.env.VITE_API_BASE_URL + `users/updatepass/${userId.value}`, changePass.value);
        swal.fire('Berhasil', 'Data success di simpan.', 'success');
        changePass.value.newPass = null;
        changePass.value.oldPass = null;
    } catch (error) {
        swal.fire('Error', 'Password mungkin tidak sama', 'error')
        router.push('/')
    }
}
</script>

<template>
    <div class="main-detail px-2">
        <div class="header pt-5">
            <h2 class="font-bold text-lg">Profile</h2>
        </div>
        <div class="body w-full h-160 flex">
            <div class="side-body w-1/4 h-full flex justify-center items-center ">
                <div class="foto-profil">
                    <img src="/src/assets/icons/user-svgrepo-com.svg" class="w-full h-70 mb-3" alt="">
                    <form action="#" class="w-full" @submit.prevent="updatePassUser">
                        <input type="password" class=" w-full border border-gray-400 p-2 rounded-xl mb-4"
                            placeholder="Password lama" v-model="changePass.oldPass">
                        <input type="password" class=" w-full border border-gray-400 p-2 rounded-xl mb-4"
                            placeholder="Password baru" v-model="changePass.newPass">
                        <button type="submit"
                            class="button py-2 w-full rounded-2xl bg-gray-600 dark:text-white hover:bg-gray-400 cursor-pointer">
                            Ganti Password
                        </button>
                    </form>
                </div>
            </div>
            <div class="side-body w-3/4 px-3">
                <form action="#" class="w-3/4" @submit.prevent="update">
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Email</label>
                        <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-3"
                            v-model="detailUser.email">
                    </div>
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Nama Lengkap</label>
                        <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-3"
                            v-model="detailUser.name">
                    </div>
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Nomor Telepon</label>
                        <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-3"
                            v-model="detailUser.phoneNumber">
                    </div>
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Alamat</label>
                        <textarea name="" id="" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl px-3"
                            v-model="detailUser.address"></textarea>
                    </div>
                    <div class="button-submit">
                        <button type="submit"
                            class="button py-2 px-5 bg-blue-400 rounded-2xl dark:text-white cursor-pointer hover:bg-blue-300">Update
                            Akun</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>