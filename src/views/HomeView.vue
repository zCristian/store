<template>
  <div class="home-wrap">
      <BaseCarousel :navigation="true" :pagination="true" :start-auto-play="false"  v-slot="{currentSlide}">
          <BaseSlide v-for="(slide,index) in carouselSlides" :key="index">
            <div v-show="currentSlide==index+1" class="slide-info">
              <img :src="require(`../assets/${slide}.svg`)" alt="banner" class="bannerimg">
            </div>
          </BaseSlide>
      </BaseCarousel>
      <div class="fretebanner-wrap">
        <div class="fretebanner-content">
          <div v-for="i in 3 " :key="i" class="frete-comp">
              <img src="../assets/fretesvg.svg">
              <div class="fretetext">
                  <h3>Frete Grátis</h3>
                  <p>para compras acima de R$ 999,99</p>
              </div>  
          </div>  
        </div>
      </div>
      <div class="new-showcase">
        <CategoryShowCase :categoryName="'Novidades'" :rowItens="3" :totalItens="9"/>
      </div>
      
      <div class="pricerange-section">
        <h2>Compre por Faixa de Preço</h2>
        <div class="ranges-wrap">
          <PriceRangeBtn v-for="i in 4" :key="i" :pricerange="pricerange[i-1]"/>
        </div>
        
      </div>
      <div class="mosaic-wrap">
        <div class="mosaic-content">
          <img :class="'mosaic-banner'+i" v-for="i in 3" :key="i" :src="require(`../assets/mosaicbanner${i}.svg`)">   
        </div>
      </div>
      <div class="galaxy-showcase">
        <CategoryShowCase :categoryName="'Galaxy'" :rowItens="3" :totalItens="9"/>
      </div>
      <!--
      <div class="maincontent">
        <ProductsSection />
      </div>
      <div class="aboutus-wrap">
        <AboutUs/>
      </div>
     --> 
  </div>
  
</template>

<script setup>
//import ProductsSection from '@/components/ProductsSection.vue';
import PriceRangeBtn from '@/components/PriceRangeBtn.vue';
//import AboutUs from '@/components/AboutUs.vue';
import BaseCarousel from '@/components/BaseCarousel.vue';
import BaseSlide from '@/components/BaseSlide.vue';
import CategoryShowCase from '@/components/CategoryShowCase.vue';
  //const products= ref([]);
const carouselSlides = ["bannerSlide","bimg2","bannerSlide","bimg2"];    
const pricerange = [999,1999,2999,3000];
</script>

<style scoped>
  .home-wrap{
    display: grid;
    grid-template-columns: [first]  250px  [second] auto [third] 250px;
    grid-template-rows: [first] 430px [second] 86px [third] 700px [fourth] 181px [fifth] 724px 
    [sixth] 700px [seventh];
    h2{
        text-align: center;
        margin: 0px;
        color: rgb(var(--primary--500));
        font-weight: 700;
        font-size: 24px;
    }
  }
 
 .fretebanner-wrap{
  display: grid;
  grid-column-end: span 3;
  grid-row: second;
  background-color: rgb(var(--neutral--100));
  grid-template-rows: [frete-first] auto;
  grid-template-columns: [frete-first] 250px  [frete-second] auto [frete-third] 250px; ;
 }
 .fretebanner-content{
    grid-column: frete-second / span 1 ;
    display: flex;
    justify-content: space-between;
    align-items: center;
 }
 .frete-comp{
  width: 204px;
  height: 54px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  .fretetext{
    display: flex;
    flex-direction: column;
    width: 146px;
    h3{
      color: rgb(var(--primary--500));
      font-size: 16px;
      font-weight: 700;
      margin: 0px;
    }
    p{
      margin: 0px;
      font-size: 14px;
      margin:0px;
    }
  }
 }
 .new-showcase{
    grid-row: third;
    grid-column: second / span 1;
    margin-top: 50px;
 }
 .galaxy-showcase{
    grid-row: sixth;
    grid-column: second / span 1;
    margin-top: 50px;
 }
 .pricerange-section{
    grid-row: fourth;
    grid-column: second; 
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 27px;
    .ranges-wrap{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
 }
 .mosaic-wrap{
  grid-row: fifth;
  grid-column: second;
  display: flex;
  align-items: flex-end;
  .mosaic-content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;  
    row-gap: 15px; 
  }
 }
</style>