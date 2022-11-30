<template>
    <div class="absolute w-full h-full flex-shrink-0 z-10 bg-gray-100 dark:bg-[#1a1a1a] dark:text-white md:relative md:w-[300px] transition-all duration-500">
        <div class="absolute w-full h-full min-w-[300px] right-0 p-5 flex flex-col">
            <slot />
        </div>
    </div>
</template>