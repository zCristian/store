<template>
    <button :class="[btnclass,isMarked? lighHeart :darkHeart]" @click="isMarked=!isMarked"> <Heart :class="[isMarked? lighHeart:darkHeart]" /></button>
   
    <!--<btn class="bmbutton"><i :class="[isMarked? lighHeart :darkHeart]"> </btn><i class="fa-solid fa-heart"></i>-->
   
</template>

<script setup >
    import {ref} from 'vue';
    import {Heart } from 'lucide-vue-next';

    const btnclass= 'bmbutton';
    const isMarked = ref(false);
    const lighHeart = 'darkheart';
    const darkHeart = 'lightheart';

   

   
</script>

<style scoped>
    .bmbutton{
        color: #E2D9FB;
        display: flex;
        border-radius: 100%;
        border:2px solid #E2D9FB;
        align-items: center;
        justify-content: center;
        padding: 2px 2px 0px 2px;
        margin-left: 5px;
    }
    .darkheart{
        color:#7F57F1;
        fill: #7F57F1;
        border-color: #7F57F1;
    }
    .bmbutton:hover{
        color: #AA8EF6;
        border:2px solid #AA8EF6;
    }
</style>