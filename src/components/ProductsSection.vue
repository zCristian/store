
<template>

    <div class="content">
        <BaseCard class="teste" v-for="product in products" :key="product.id" :productName="product.productName"/>
    
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
.content{
    margin: 20px 40px 20px 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.teste{
  flex-basis: 23%;
  height: 320px;
  margin: 20px;
}


</style>