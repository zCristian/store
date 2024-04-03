<template>
    <slot :currentSlide="currentSlide"></slot>

    <div v-if="navEnabled" class="navigate">
        <div class="moveslide left">
            <CircleChevronLeft @click="prevSlide" class="icon"/>
        </div>
        <div class="moveslide right">
            <CircleChevronRight @click="nextSlide" class="icon"/>
        </div>
    </div>

    <div v-if="paginationEnabled" class="bottpag">
        <span v-for="(slide,index) in getSlideCount" :key="index"  @click="selectSlide(index)" :class="{selected: index+1==currentSlide}"></span>
    </div>
</template>

<script setup>
import { CircleChevronLeft, CircleChevronRight } from 'lucide-vue-next';
import {ref,onMounted,defineProps} from 'vue';

const props = defineProps(["startAutoPlay", "timer", "navigation","pagination"]);
const paginationEnabled = ref(props.pagination === undefined ? true : props.pagination);
const navEnabled = ref(props.navigation === undefined? true: props.navigation);
const autoPlayEnabled = ref(props.startAutoPlay === undefined? true: props.startAutoPlay);
const timer = ref(props.timer === undefined? 5000: props.timer);


const currentSlide = ref(1);
const getSlideCount = ref(null);



const autoPlay = () =>{
    setInterval(()=>{
        nextSlide()
    }, timer.value);
}

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

if(autoPlayEnabled.value){
    autoPlay();
}

onMounted(()=>{
    getSlideCount.value = document.querySelectorAll('.slide').length;
   
})
</script>

<style scoped>
.navigate{
    height: 450px;
    width: 99%;
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

.bottpag{
    position: absolute;
    top: 520px;
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