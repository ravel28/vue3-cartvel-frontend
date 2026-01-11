<template>
    <div class="list-cart block px-2">
        <div class="header py-4">
            <h4 class="font-bold">List Cart</h4>
        </div>
        <ul class="list-none mb-10">
            <li class="flex h-20">
                <div class="picture bg-gray-200 w-1/12 h-full">

                </div>
                <div class="detail-cart w-9/12 block px-3">
                    <h1 class="font-bold text-sm">Item 1</h1>
                    <p>400,-</p>
                </div>
                <div class="qty-cart block w-2/12 text-center">
                    <label class="text-center w-full py-2 font-bold text-sm">QTY</label>
                    <div class="input-qty flex justify-center">
                        <div class="update-cart-minus flex justify-center items-center mx-1">
                            <img src="/src/assets/icons/minus-square-svgrepo-com.svg" class="w-6 h-6" alt="">
                        </div>
                        <input type="number" name="qty" class="outline-gray-300 w-15 border rounded-sm" readonly='true'>
                        <div class="update-cart-minus flex justify-center items-center mx-1">
                            <img src="/src/assets/icons/plus-square-svgrepo-com.svg" class="w-6 h-6" alt="">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="w-full flex justify-between mb-10">
            <span class="font-bold">Total</span>
            <span class="mx-3">100.00</span>
        </div>
        <div class="checkout">
            <button class="button py-3 px-4 bg-green-500 dark:text-white rounded-lg">
                Checkout
            </button>
        </div>
    </div>
</template>