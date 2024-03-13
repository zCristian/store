<template>
  <div class="home">
      <div class="maincontent">
        <ProductsSection :products="products"/>
  
      </div>
  </div>
  
</template>

<script setup>
import ProductsSection from '@/components/ProductsSection.vue';

    
    

    //const products= ref([]);

    const products=[
      {
        id:1,
        productName:'Produto1',
        productImgSrc:'t1',
        procuctPrice:200,
        productNReviews:124,
        productQtt:0,
        productRating:5,
        stock:65,
      },
      {
        id:2,
        productName:'Produto2',
        productImgSrc:'t1',
        procuctPrice:300,
        productNReviews:123,
        productQtt:0,
        productRating:4.5
      },
      {
        id:3,
        productName:'Produto2',
        productImgSrc:'t1',
        procuctPrice:300,
        productNReviews:123,
        productQtt:0,
        productRating:4.5
      },
      {
        id:4,
        productName:'Produto2',
        productImgSrc:'t1',
        procuctPrice:300,
        productNReviews:123,
        productQtt:0,
        productRating:4.5
      },
      {
        id:4,
        productName:'CocA',
        productImgSrc:'t1',
        procuctPrice:300,
        productNReviews:123,
        productQtt:0,
        productRating:4.5
      }
    
    ]
</script>

<style>
  
</style>