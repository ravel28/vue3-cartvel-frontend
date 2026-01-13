<script setup>
import { ref, getCurrentInstance } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()
const { appContext } = getCurrentInstance();
const swal = appContext.config.globalProperties.$swal;

const cardSignUp = ref(null);
const cardSignIn = ref(null);

const headerSignIn = ref('Welcome');
const headerSignUp = ref('Registrasi');

const formSignIn = ref({
  email: '',
  password: ''
})

const formSignUp = ref({
  email: '',
  name: '',
  phoneNumber: '',
  address: '',
  password: ''
})

const emit = defineEmits(['submit'])

const signIn = async () => {
  try {
    const dataUser = await axios.post(import.meta.env.VITE_API_BASE_URL + 'users/login', formSignIn.value)

    const roleResult = dataUser.data.data.role;
    localStorage.setItem('idUser', dataUser.data.data.idUser);
    localStorage.setItem('isLogin', true);
    localStorage.setItem('isUser', roleResult === 'USER' ? true : false);
    await swal.fire('Berhasil', 'Data email dan password cocok.', 'success');
    router.push('home/dashboard')
  } catch (error) {
    swal.fire('Error', 'Terjadi kesalahan saat login.', 'error')
    router.push('/')
  }
  emit('submit', { ...formSignIn.value })
}

const signUp = async () => {
  try {
    await axios.post(import.meta.env.VITE_API_BASE_URL + 'users/create', formSignUp.value)
    await swal.fire('Berhasil', 'Data sudah tersimpan ! Silahkan masuk.', 'success')
    toggleCard(false);
  } catch (error) {
    console.error('Login failed:', error)
  }
  emit('submit', { ...formSignUp.value })
}

function toggleCard(formSignUp) {
  if (formSignUp) {
    cardSignUp.value.classList.remove('translate-x-full');
    cardSignIn.value.classList.add('-translate-x-full')
  } else {
    cardSignUp.value.classList.add('translate-x-full');
    cardSignIn.value.classList.remove('-translate-x-full')
  }

}

function home() {
  router.push('/home/dashboard');
}
</script>

<template>
  <div class="body w-full h-screen flex justify-center items-center bg-[#5A6ADB]">
    <div class="card bg-white w-3xl h-120 rounded-2xl shadow-md">
      <div class="body-card h-full grid grid-cols-2">
        <div class="side-body flex relative overflow-x-hidden">
          <div class="w-full h-full absolute z-0">
            <img src="/src/assets/bg/strorage.png" class="w-full h-full rounded-l-2xl" alt="">
          </div>
          <div ref="cardSignUp"
            class="w-full h-full absolute flex justify-center items-center duration-500 ease-out left-0 bg-white z-10 rounded-l-2xl translate-x-full">
            <div class="card w-4/5 h-95">
              <div class="header-card text-center pt-7 pb-10">
                <h2 class="font-bold text-2xl">{{ headerSignUp }}</h2>
              </div>
              <div class="body-card">
                <form action="#" @submit.prevent="signUp">
                  <div class="pb-3">
                    <input type="email" name="email" id="newEmail"
                      class="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="email@gmail.com"
                      required v-model="formSignUp.email" />
                  </div>
                  <div class="pb-3">
                    <input type="text" name="name" id="newName"
                      class="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Your Name"
                      required v-model="formSignUp.name" />
                  </div>
                  <div class="pb-3">
                    <textarea name="name" id="address"
                      class="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Your Address"
                      required v-model="formSignUp.address" />
                  </div>
                  <div class="pb-3 flex w-full">
                    <div class="pb-3 w-1/2">
                      <input type="text" name="phone" id="newPhoneNumber"
                        class="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Your Phone Number" required v-model="formSignUp.phoneNumber" />
                    </div>
                    <div class="w-1/2">
                      <input type="password" name="pass" id="newPass"
                        class="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Your Password"
                        required v-model="formSignUp.password" />
                    </div>
                  </div>
                  <button type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">
                    Daftar
                  </button>
                  <div class="text-sm font-medium text-gray-500 dark:text-gray-500">
                    Sudah punya akun ?
                    <a href="#" class="text-blue-700 hover:underline dark:text-blue-500" @click="toggleCard(false)">
                      login yuk!
                    </a>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
        <div class="side-body flex relative overflow-x-hidden">
          <div class="w-full h-full absolute z-10">
            <img src="/src/assets/bg/registration.png" class="w-full h-full rounded-r-2xl" alt="">
          </div>
          <div ref="cardSignIn"
            class="bg-white w-full h-full absolute z-20 flex justify-center items-center rounded-r-2xl duration-500 ease-out left-0">
            <div class="card w-4/5 h-95  relative">
              <div class="header-card text-center pt-7 pb-10">
                <h2 class="font-bold text-2xl">{{ headerSignIn }}</h2>
              </div>
              <div class="body-card">
                <form action="#" @submit.prevent="signIn">
                  <div class="pb-3">
                    <input type="email" name="email" id="email"
                      class="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="email@gmail.com"
                      required v-model="formSignIn.email" />
                  </div>
                  <div>
                    <input type="password" name="pass" id="pass"
                      class="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Your Password"
                      required v-model="formSignIn.password" />
                  </div>
                  <button type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">Login</button>
                  <div class="text-sm font-medium text-gray-500 dark:text-gray-500">
                    Belum punya akun ?
                    <a href="#" class="text-blue-700 hover:underline dark:text-blue-500" @click="toggleCard(true)">
                      Daftar aja !
                    </a>
                  </div>
                </form>
              </div>
              <div class="footer absolute bottom-0 w-full">
                <button
                  class="py-3 px-2 bg-yellow-500 w-full rounded-lg dark:text-white shadow-2xl cursor-pointer hover:bg-yellow-400"
                  @click="home()">
                  Lihat Barang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
