<template>
    <div class="showcase-wrap">
        <div class="showcase-head">
            <h2>{{ category.nomeCategoria}}</h2>
        </div>
        <div class="showcase-content">
            <BaseCard v-for="(product,i) in rowproducts" :key="i" :product="product" />
        </div>
        <div class="showcase-navigation">
            <div class="moveleft">
            <CircleChevronLeft class="arrow-icon" :stroke-width="1" @click="moveCarouselLeft"/>
            </div>
            <div class="moveright">
                <CircleChevronRight class="arrow-icon" :stroke-width="1" @click="moveCarouselRight"/>
            </div>
        </div>
        <div class="showcase-pagination">
        <span :class="['circle',{selected: i === currentPosition}]" v-for="i in totalPosition" :key="i" @click="selectPage(i)"></span>
    </div>
    </div>
</template>

<script setup>
import BaseCard from './BaseCard.vue';
import {defineProps, ref, onBeforeMount} from 'vue';
import {CircleChevronRight,CircleChevronLeft} from 'lucide-vue-next'
const axios = require('axios').default;
const props = defineProps({
    categoryName : {
        type: String,
        required: true
    },
    rowItens:{
        type: Number,
        required:true
    },
    totalItens:{
        type: Number,
        required: true
    }
})
const category = ref({});
const products = ref([]);
const rowproducts = ref([]);
const currentPosition = ref(1);
const numberOfItens = ref(0);
const totalPosition = ref(0);
onBeforeMount(()=>{
    loadCategory(props.categoryName);
})

const loadCategory=(categoryName)=>{
    const loadcategory_url='http://localhost:3000/categorias/'+categoryName;
    axios.get(loadcategory_url).then(function(response){
        category.value = response.data.result[0];
        loadProducts(category.value.codigoCategoria);
    }).catch(function(error){
        console.log(error.message);
    })
}

const loadProducts = (categoryCode) =>{
    const loadproducts_url = 'http://localhost:3000/produtos?categorias='+categoryCode;
    axios.get(loadproducts_url)
    .then(function(response){
        products.value = response.data.result.slice(0,props.totalItens);
        numberOfItens.value = products.value.length;
        totalPosition.value = Math.floor(numberOfItens.value/props.rowItens)+1;
        getRowProducts(0,props.rowItens);
    }).catch(function(error){
        console.log(error.message);
    })
}

const getRowProducts=(initial,last)=>{
    rowproducts.value = products.value.slice(initial,last);
}

//ShowCase Navigation & Pagination


const moveCarouselRight=()=>{
    if(currentPosition.value >=totalPosition.value){
        getRowProducts(0,props.rowItens);
        currentPosition.value=1;
    }else{ 
      getRowProducts(props.rowItens*currentPosition.value,props.rowItens*currentPosition.value + props.rowItens);    
      currentPosition.value++;  
    }
}
const moveCarouselLeft=()=>{
    if(currentPosition.value===1){
        getRowProducts(props.rowItens*totalPosition.value - props.rowItens,props.rowItens*totalPosition.value);
        console.log(totalPosition.value)
        currentPosition.value = totalPosition.value;
    }else{
        currentPosition.value--;
        getRowProducts(props.rowItens*(currentPosition.value-1) ,props.rowItens*currentPosition.value );
        
    }   
    console.log(totalPosition.value);
}
const selectPage = (position) =>{
    currentPosition.value = position;
    getRowProducts(props.rowItens*(currentPosition.value-1),
    props.rowItens*(currentPosition.value-1) + props.rowItens);
}
</script>

<style scoped>
.showcase-wrap{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    h2{
        text-align: center;
        margin: 0px;
        color: rgb(var(--primary--500));
        font-weight: 700;
        font-size: 24px;
    }
}

.showcase-content{
    width: 97%;
    display: flex;
    justify-content: space-around;
}
.showcase-navigation{
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    bottom: 350px;
    .arrow-icon{
        height: 32px;
        width: 32px;
        color: rgb(var(--primary--200));
        cursor: pointer;
    }
    .arrow-icon:hover{
        color: rgb(var(--primary--400));
    }
}

.showcase-pagination{
    display: flex;
    position: relative;
    height: 30px;
    bottom: 100px;
    justify-content: center;
    align-items: flex-end;
    gap: 5px;
    width: 100%;
    flex-shrink: 0;
}

.circle{
    cursor: pointer;
    border-radius: 50%;
    background-color: rgb(var(--primary--200));
    height: 12px;
    width: 12px;
}
.selected{
    background-color: rgb(var(--primary--500));
    height: 12px;
    width: 12px;
}
</style>