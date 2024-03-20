<template>
  <div class="home">
      <BaseCarousel class="carousel" v-slot="{currentSlide}">
          <BaseSlide v-for="(slide,index) in carouselSlides" :key="index">
            <div v-show ="currentSlide===index+1" class="slide-info">
              <img :src="require(`../assets/${slide}.svg`)" alt="">
            </div>
          </BaseSlide>
      </BaseCarousel>
      <div class="fretebanner"><img src="../assets/fretebanner.svg" class="fretesvg"></div>
      <h2>Compre por Faixa de Preço</h2>
      <div class="pricerange">
        <PriceRangeBtn v-for="i in 4" :key="i" :pricerange="+pricerange[i-1]"/>
        
      </div>
      
      <div class="maincontent">
        <ProductsSection :products="products"/>
      </div>
      <AboutUs/>
  </div>
  
</template>

<script setup>
import ProductsSection from '@/components/ProductsSection.vue';
import PriceRangeBtn from '@/components/PriceRangeBtn.vue';
import AboutUs from '@/components/AboutUs.vue';
import BaseCarousel from '@/components/BaseCarousel.vue';
import BaseSlide from '@/components/BaseSlide.vue';
    
    //const products= ref([]);
    const carouselSlides = ["bannerSlide","bannerSlide","bannerSlide","bannerSlide"];
    const products=[
      {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/2.jpg","https://cdn.dummyjson.com/product-images/1/3.jpg","https://cdn.dummyjson.com/product-images/1/4.jpg","https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"]},
      {"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/2/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/2/1.jpg","https://cdn.dummyjson.com/product-images/2/2.jpg","https://cdn.dummyjson.com/product-images/2/3.jpg","https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"]},
      {"id":3,"title":"Samsung Universe 9","description":"Samsung's new variant which goes beyond Galaxy to the Universe","price":1249,"discountPercentage":15.46,"rating":4.09,"stock":36,"brand":"Samsung","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/3/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/3/1.jpg"]},
      {"id":4,"title":"OPPOF19","description":"OPPO F19 is officially announced on April 2021.","price":280,"discountPercentage":17.91,"rating":4.3,"stock":123,"brand":"OPPO","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/4/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/4/1.jpg","https://cdn.dummyjson.com/product-images/4/2.jpg","https://cdn.dummyjson.com/product-images/4/3.jpg","https://cdn.dummyjson.com/product-images/4/4.jpg","https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"]},
      {"id":5,"title":"Huawei P30","description":"Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.","price":499,"discountPercentage":10.58,"rating":4.09,"stock":32,"brand":"Huawei","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/5/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/5/1.jpg","https://cdn.dummyjson.com/product-images/5/2.jpg","https://cdn.dummyjson.com/product-images/5/3.jpg"]},
      {"id":6,"title":"MacBook Pro","description":"MacBook Pro 2021 with mini-LED display may launch between September, November","price":1749,"discountPercentage":11.02,"rating":4.57,"stock":83,"brand":"Apple","category":"laptops","thumbnail":"https://cdn.dummyjson.com/product-images/6/thumbnail.png","images":["https://cdn.dummyjson.com/product-images/6/1.png","https://cdn.dummyjson.com/product-images/6/2.jpg","https://cdn.dummyjson.com/product-images/6/3.png","https://cdn.dummyjson.com/product-images/6/4.jpg"]},
      {"id":7,"title":"Samsung Galaxy Book","description":"Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched","price":1499,"discountPercentage":4.15,"rating":4.25,"stock":50,"brand":"Samsung","category":"laptops","thumbnail":"https://cdn.dummyjson.com/product-images/7/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/7/1.jpg","https://cdn.dummyjson.com/product-images/7/2.jpg","https://cdn.dummyjson.com/product-images/7/3.jpg","https://cdn.dummyjson.com/product-images/7/thumbnail.jpg"]},
      {"id":8,"title":"Microsoft Surface Laptop 4","description":"Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.","price":1499,"discountPercentage":10.23,"rating":4.43,"stock":68,"brand":"Microsoft Surface","category":"laptops","thumbnail":"https://cdn.dummyjson.com/product-images/8/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/8/1.jpg","https://cdn.dummyjson.com/product-images/8/2.jpg","https://cdn.dummyjson.com/product-images/8/3.jpg","https://cdn.dummyjson.com/product-images/8/4.jpg","https://cdn.dummyjson.com/product-images/8/thumbnail.jpg"]}
      ];
      const pricerange = [999,1999,2999,3000];

</script>

<style scoped>
  .home{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .carousel{
    position: relative;
    height: 430px;
    
    .slide-info{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 430px;
    }
    img{
      width: 100%;
      height: 430px;
      object-fit: cover;
    }
  }
  .fretebanner,.fretesvg{
    background-color: #F3F3F3;
    width: 100%;
  }
  .maincontent{
    display: flex;
    flex-wrap: wrap;
    margin: 15px 12% 15px 12%;
    justify-content: center;
    
  }
  .fretesvg{
    width: 100%;
  }

  .pricerange{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    width: 1320px;
    margin: 0px 13% 0px 13%;
  }
  h2{
    margin-top: 55px;
    text-align: center;
    color: #7F57F1;
    font-size: 30px;
  }
</style>