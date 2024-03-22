<template>

    <div class="slide">
        <transition name="slide">
            <slot/>
        </transition>
    </div>
</template>


<script setup></script>

<style >
.slide-enter-active,
.slide-leave-active {
    transition: 0.5s ;
}

.slide-enter{
    transform: translate(100%,0);
}

.slide-leav-to{
    transform: translate(-100%,0);
}

</style>