<template>
  <div class="home">
      <BaseCarousel :navigation="true" :pagination="true" :start-auto-play="false"  v-slot="{currentSlide}">
          <BaseSlide v-for="(slide,index) in carouselSlides" :key="index">
            <div v-show="currentSlide==index+1" class="slide-info">
              <img :src="require(`../assets/${slide}.svg`)" alt="banner" class="bannerimg">
            </div>
          </BaseSlide>
      </BaseCarousel>
      <div class="fretebanner">
        <div v-for="i in 4 " :key="i" class="fretecomp">
            <img src="../assets/fretesvg.svg">
            <div class="fretetext">
                <h3>Frete Grátis</h3>
                <p>para compras acima de R$ 999,99</p>
            </div>  
        </div>
      </div>
      
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
  .fretebanner{
    background-color: #F3F3F3;
    width: 100%;
    height: 86px;
    margin-top: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 134px;
    
  }
  .fretecomp{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 204px;
    height: 54px;
   
    img{
      height: 54px;
      width: 54px;
      margin: 0px;
    
    }
    
  }
  .fretetext{
    display: flex;
    flex-direction: column;

    h3{
      color: #7F57F1;
      margin: 0px 0px 0px 10px;
      font-size: 16px;
      font-style: bold;
    }
    p{
      margin: 0px 0px 0px 10px ;
      font-size: 13px;
    }
  }
  .maincontent{
    display: flex;
    flex-wrap: wrap;
    height:700px;
    width: 1220px;
    justify-content: center;
    
  }
  

  .pricerange{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1220px;
    
    
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
    margin: 50px 0px 25px 0px;
    text-align: center;
    color: #7F57F1;
    font-size: 30px;
    display: flex;
    justify-content: center;
    flex-basis: 100%;
  }
</style>