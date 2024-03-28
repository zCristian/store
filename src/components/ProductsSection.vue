
<template>
    <div class="news"><h2>Novidades</h2></div>

    <div class="content">
        <BaseCard class="teste" v-for="(product) in filteredProducts" :key="product.id" :product="product" />
    </div>
    <div class="navigation">
        <div class="moveleft">
            <CircleChevronLeft class="arrowicon" @click="moveCarouselLeft"/>
        </div>
        <div class="moveright">
            <CircleChevronRight class="arrowicon" @click="moveCarouselRight"/>
        </div>
    </div>
    <div class="prodpagination">
        <span :class="['circle',{selected: i == selectedCircle}]" v-for="i in 3" :key="i" @click="selectPage(i)"></span>
    </div>
</template>

<script setup >

import BaseCard from './BaseCard.vue';
import { ref, onMounted} from 'vue'
import { CircleChevronLeft, CircleChevronRight } from 'lucide-vue-next';

const selectedCircle = ref(1);
const range = ref([1,4])
const maxRender = 8;
const filteredProducts = ref([]);
const products=[
      {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/2.jpg","https://cdn.dummyjson.com/product-images/1/3.jpg","https://cdn.dummyjson.com/product-images/1/4.jpg","https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"]},
      {"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/2/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/2/1.jpg","https://cdn.dummyjson.com/product-images/2/2.jpg","https://cdn.dummyjson.com/product-images/2/3.jpg","https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"]},
      {"id":3,"title":"Samsung Universe 9","description":"Samsung's new variant which goes beyond Galaxy to the Universe","price":1249,"discountPercentage":15.46,"rating":4.09,"stock":36,"brand":"Samsung","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/3/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/3/1.jpg"]},
      {"id":4,"title":"OPPOF19","description":"OPPO F19 is officially announced on April 2021.","price":280,"discountPercentage":17.91,"rating":4.3,"stock":123,"brand":"OPPO","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/4/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/4/1.jpg","https://cdn.dummyjson.com/product-images/4/2.jpg","https://cdn.dummyjson.com/product-images/4/3.jpg","https://cdn.dummyjson.com/product-images/4/4.jpg","https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"]},
      {"id":5,"title":"Huawei P30","description":"Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.","price":499,"discountPercentage":10.58,"rating":4.09,"stock":32,"brand":"Huawei","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/5/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/5/1.jpg","https://cdn.dummyjson.com/product-images/5/2.jpg","https://cdn.dummyjson.com/product-images/5/3.jpg"]},
      {"id":6,"title":"MacBook Pro","description":"MacBook Pro 2021 with mini-LED display may launch between September, November","price":1749,"discountPercentage":11.02,"rating":4.57,"stock":83,"brand":"Apple","category":"laptops","thumbnail":"https://cdn.dummyjson.com/product-images/6/thumbnail.png","images":["https://cdn.dummyjson.com/product-images/6/1.png","https://cdn.dummyjson.com/product-images/6/2.jpg","https://cdn.dummyjson.com/product-images/6/3.png","https://cdn.dummyjson.com/product-images/6/4.jpg"]},
      {"id":7,"title":"Samsung Galaxy Book","description":"Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched","price":1499,"discountPercentage":4.15,"rating":4.25,"stock":50,"brand":"Samsung","category":"laptops","thumbnail":"https://cdn.dummyjson.com/product-images/7/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/7/1.jpg","https://cdn.dummyjson.com/product-images/7/2.jpg","https://cdn.dummyjson.com/product-images/7/3.jpg","https://cdn.dummyjson.com/product-images/7/thumbnail.jpg"]},
      {"id":8,"title":"Microsoft Surface Laptop 4","description":"Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.","price":1499,"discountPercentage":10.23,"rating":4.43,"stock":68,"brand":"Microsoft Surface","category":"laptops","thumbnail":"https://cdn.dummyjson.com/product-images/8/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/8/1.jpg","https://cdn.dummyjson.com/product-images/8/2.jpg","https://cdn.dummyjson.com/product-images/8/3.jpg","https://cdn.dummyjson.com/product-images/8/4.jpg","https://cdn.dummyjson.com/product-images/8/thumbnail.jpg"]},
      {"id":9,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/2.jpg","https://cdn.dummyjson.com/product-images/1/3.jpg","https://cdn.dummyjson.com/product-images/1/4.jpg","https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"]},
      {"id":10,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/2/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/2/1.jpg","https://cdn.dummyjson.com/product-images/2/2.jpg","https://cdn.dummyjson.com/product-images/2/3.jpg","https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"]}
];


const selectPage = (pos) =>{
    selectedCircle.value = pos;
    filterProducts([1+4*(pos-1),4+4*(pos-1)]); 
    console.log(selectedCircle.value);
}
const filterProducts = (range) =>{
     filteredProducts.value = products.filter((product) => product.id<=range[1] && product.id>=range[0]);
}

const moveCarouselRight = () =>{
    if(range.value[0]>maxRender){
        range.value[0]=1;
        range.value[1] = 4;
        selectedCircle.value =1;
    }else{
        for(let i=0; i<2; i++){
            range.value[i]+=4;
        }
        selectedCircle.value +=1;
    }
    
   
    filterProducts(range.value);
}

const moveCarouselLeft = () =>{
    if(range.value[0]<3){
        range.value[0]= maxRender+1;
        range.value[1] = maxRender+4;
        selectedCircle.value =3;
    }else{
        for(let i=0; i<2; i++){
         range.value[i]-=4;
        }
        selectedCircle.value -=1;
    }
    
 
    filterProducts(range.value);
}


onMounted(() => {
    filterProducts(range.value);
})
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
  height: 550px;
  width: 1220px;
  display: flex;
  justify-content: flex-start;
  gap: 53px;
  flex-wrap: wrap;

}

.navigation{
    width: 1280px;
    position: relative;
    bottom: 275px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}
.arrowicon{
    color: #7F57F1;
    height: 30px;
    width: 30px;
    cursor: pointer;
}

.prodpagination{
    display: flex;
    position: relative;
    height: 30px;
    top: -60px;
    justify-content: center;
    align-items: end;
    gap: 20px;
    width: 1220px;
    flex-shrink: 0;
}

.circle{
    border-radius: 50%;
    background-color: grey;
    height: 12px;
    width: 12px;
}
.selected{
    background-color: black;
    height: 13px;
    width: 13px;
}
</style>