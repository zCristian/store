<template>
  <div class="home">
      <BaseCarousel :navigation="true" :pagination="true" :start-auto-play="false" class="carousel" v-slot="{currentSlide}">
          <BaseSlide v-for="(slide,index) in carouselSlides" :key="index">
            <div v-show="currentSlide==index+1" class="slide-info">
              <img :src="require(`../assets/${slide}.svg`)" alt="banner" class="bannerimg">
            </div>
          </BaseSlide>
      </BaseCarousel>
      <div class="fretebanner"><img src="../assets/fretebanner.svg" class="fretesvg"></div>
      

      <div class="pricerange">
        <h2>Compre por Faixa de Preço</h2>
        <PriceRangeBtn v-for="i in 4" :key="i" :pricerange="+pricerange[i-1]"/>
      </div>
      <div class="mosaic">
        <img :class="'mosaicbanner'+i" v-for="i in 3" :key="i" :src="require(`../assets/mosaicbanner${i}.svg`)">
      </div>
      <div class="maincontent">
        <ProductsSection />
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
    const carouselSlides = ["bannerSlide","bimg2","bannerSlide","bimg2"];
    
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
    height: 450px;
  
  }
  .bannerimg{
      width: 100%;
      height: 450px;
      object-fit: cover;
    }
  .slide-info{
      position: absolute;
      width: 100%;
      height: 450px;
    }
  .fretebanner,.fretesvg{
    background-color: #F3F3F3;
    width: 100%;
  }
  .maincontent{
    display: flex;
    flex-wrap: wrap;
    height:700px;
    width: 1220px;
    justify-content: center;
    
  }
  .fretesvg{
    margin-top: 450px;
    width: 100%;
  }

  .pricerange{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1220px;
    margin-top: 50px;
    
  }
  .mosaic{
    display: flex;
    width: 1220px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 100px;

  }
  h2{
    margin-top: 50px;
    text-align: center;
    color: #7F57F1;
    font-size: 30px;
    display: flex;
    justify-content: center;
    flex-basis: 100%;
  }
</style>