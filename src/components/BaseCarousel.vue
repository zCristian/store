<template>
    <slot :currentSlide="currentSlide"></slot>

    <div class="navigate">
        <div class="moveslide left"></div>
            <CircleChevronLeft @click="prevSlide" class="icon"/>
        <div class="moveslide right">
            <CircleChevronRight @click="nextSlide" class="icon"/>
        </div>
    </div>
</template>

<script setup>
import { CircleChevronLeft, CircleChevronRight } from 'lucide-vue-next';
import {ref,onMounted} from 'vue';
const currentSlide = ref(1);
const getSlideCount = ref(null);


const nextSlide = () =>{
    if(currentSlide.value === getSlideCount.value){
            currentSlide.value = 1;
            return;
    }
    currentSlide.value+=1;
}

const prevSlide = ()=>{
    if(currentSlide.value === 1){
        currentSlide.value =1;
        return;
    }
    currentSlide.value-=1;
}
onMounted(()=>{
    getSlideCount.value = document.querySelectorAll('.slide').length;
    console.log(getSlideCount.value);
})
</script>

<style scoped>
.navigate{
    padding: 0 16px;
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    .moveslide{
        display: flex;
        flex:1;
    }
    .right{
        justify-content: flex-end;
    }
    .icon{
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 40px;
        height: 40px;
        color: #7F57F1;
    }
}


</style>