<template>
    <div class="bookmark-wrap">
        <button :class="['bookmark-btn',isMarked? 'dark-btn' :'light-btn']" 
        @click="isMarked=!isMarked"> <Heart :stroke-width="1" 
        :class="[isMarked? 'dark-heart':'light-heart']" /></button>    
    </div>   
</template>

<script setup >
    import {ref} from 'vue';
    import {Heart } from 'lucide-vue-next';
    const isMarked = ref(false);
</script>

<style scoped>
    .bookmark-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        :hover{
            transition: all ease-in-out 0.3s;
            background-color: rgb(var(--primary--100));
        }
    }
    .bookmark-btn{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-radius: 100%;
        background-color:transparent;
    }
    .light-btn{
        border: 1px solid rgb(var(--primary--500));
        .light-heart{
            color: rgb(var(--primary--500));
        }
    }

    .dark-btn{
        border: 2px solid rgb(var(--primary--600));
        .dark-heart{
            fill: rgb(var(--primary--600));
            color: rgb(var(--primary--600)) ;
        }
    }
</style>