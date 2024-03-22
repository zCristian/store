<template>
    <slot :currentSlide="currentSlide"></slot>

    <div class="navigate">
        <div class="moveslide left">
            <CircleChevronLeft @click="prevSlide" class="icon"/>
        </div>
        <div class="moveslide right">
            <CircleChevronRight @click="nextSlide" class="icon"/>
        </div>
    </div>

    <div class="bottnav">
        <span v-for="(slide,index) in getSlideCount" :key="index"  @click="selectSlide(index)" :class="{selected: index+1==currentSlide}"></span>
    </div>
</template>

<script setup>
import { CircleChevronLeft, CircleChevronRight } from 'lucide-vue-next';
import {ref,onMounted} from 'vue';
const currentSlide = ref(1);
const getSlideCount = ref(null);


const selectSlide = (index)=>{
    currentSlide.value = index + 1;
}
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
    height: 410px;
    width: 1500px;
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

.bottnav{
    position: absolute;
    top: 490px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 30px;
}

span{
    display: flex;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    width: 20px;
    height: 20px;
   
}
.selected{
    background-color: #7F57F1;
    border: 1px solid white;
}
</style>