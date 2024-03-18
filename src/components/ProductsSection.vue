
<template>
    <div class="news"><h2>Novidades</h2></div>
    <div class="content">
        <BaseCard class="teste" v-for="product in products" :key="product.id" :product="product"/>
    
    </div>
</template>

<script setup >

import BaseCard from './BaseCard.vue';
import defineProps from 'vue'

const props = defineProps({
    products:{
        type:Array,
        required:true
    }
})
console.log(props.product)
</script>

<style scoped>
.news{
    display: flex;
    justify-content: center;
    
    flex-basis: 100%;

}
h2{
    color: #7F57F1;
    margin-top: 0px;
    font-size: 30px;
    margin-top: 55px;
}
.content{

  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

}


</style>