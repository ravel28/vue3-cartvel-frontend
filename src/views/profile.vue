<template>
    <div class="main-detail px-2">
        <div class="header pt-5">
            <h2 class="font-bold text-lg">Profile</h2>
        </div>
        <div class="body w-full h-160 flex">
            <div class="side-body w-1/4 h-full flex justify-center items-center ">
                <div class="foto-profil">
                    <img src="/src/assets/icons/user-svgrepo-com.svg" class="w-full h-70 mb-3" alt="">
                    <form action="#" class="w-full">
                        <input type="password" class=" w-full border border-gray-400 p-2 rounded-xl mb-4">
                        <button class="button py-2 w-full rounded-2xl bg-gray-600 dark:text-white">
                            Ganti Password
                        </button>
                    </form>
                </div>
            </div>
            <div class="side-body w-3/4 px-3">
                <form action="#" class="w-3/4">
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Email</label>
                        <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl">
                    </div>
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Nama Lengkap</label>
                        <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl">
                    </div>
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Nomor Telepon</label>
                        <input type="text" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl">
                    </div>
                    <div class="input block mb-4">
                        <label for="" class="w-full font-bold text-md">Alamat</label>
                        <textarea name="" id="" class="border w-full border-gray-300 mt-2 py-2 rounded-2xl"></textarea>
                    </div>
                    <div class="button-submit">
                        <button class="button py-2 px-5 bg-blue-400 rounded-2xl dark:text-white">Update Akun</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>