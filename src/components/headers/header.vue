<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const { appContext } = getCurrentInstance();
const swal = appContext.config.globalProperties.$swal;

const headerNav = ref('CartVel');
const isUser = ref(localStorage.getItem('isUser') === 'true' ? true : false);

const isGuest = ref(localStorage.getItem('isLogin') ? false : true)

// if (!localStorage.getItem('isLogin')) {
//     swal.fire('Tidak dapat akses', 'Anda belum melakukan login', 'warning')
//     router.push('/')
// }

async function signIn() {
    router.push('/');
}

async function signOut() {
    const result = await swal.fire({
        title: 'Yakin mau keluar?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
    })

    if (result.isConfirmed) {
        await swal.fire('Successully Sign Out', '', 'success')
        localStorage.clear();
        router.push('/');
    } else {
        swal.fire('Dibatalkan', 'Selamat berbelanja', 'info')
    }
}
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
                <li class="px-4 cursor-pointer hover:text-gray-400" v-if="isUser">
                    <a href="/home/transaction/">
                        Transaction
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400" v-if="isUser">
                    <a href="/home/cart/">
                        Cart
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="/home/profil/" v-if="!isGuest">
                        Profile
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="#" @click="signOut()" v-if="!isGuest">
                        Keluar
                    </a>
                </li>
                <li class="px-4 cursor-pointer hover:text-gray-400">
                    <a href="#" @click="signIn()" v-if="isGuest">
                        Login
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>