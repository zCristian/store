<template>

    <div class="productpage-content" onload='location.href="#productpage"'>
        <div class="product-head">
            <div class="img-col">
                <div class="img-mini" v-for="i in 4" :key="i" >
                </div>
            </div>
            <div class="img-center"></div>
            <div class="product-description"></div>
        </div>
        <div class="stripe"></div>
        <div class="moreinfo"></div>
        <div class="review-section"></div>

    
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
onBeforeMount(()=>{
    window.scrollTo(top);
})
</script>

<style scoped>

    .productpage-content{
       
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .product-head{
        width: 1220px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 50px 0px;

        .img-col{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100px;
            margin: 0px;
            height: 430px;
          
            .img-mini{
                width: 100%;
                height: 100px;
                background-color: #D9D9D9;
                margin: 0px;
            }
        }
        .img-center{
            margin: 0px;
            width: 600px;
            height: 600px;
            background-color: #D9D9D9;
        }
        .product-description{
            margin: 0px;
            width: 472px;
            height: 600px;
            background-color: #D9D9D9;
        }
    }
    .stripe{
        margin: 50px 0px;
        width: 1220px;
        height: 87px;
        background-color: grey;
    }
    .moreinfo{
        margin: 20px 0px;
        width: 1220px;
        height: 374px ;
        background-color: #D9D9D9;
    }

    .review-section{
        margin: 20px 0px;
        width: 1220px;
        height: 374px;
        background-color: #D9D9D9;
    }
</style>