<template>

    <div class="productpage-content">
        <div class="product-head">
            <div class="img-col"></div>
            <div class="img-center"></div>
            <div class="product-description"></div>
        </div>
        <div class="stripe"></div>
        <div class="moreinfo"></div>
        <div class="review-section"></div>

    
    </div>
</template>

<script setup></script>

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
            flex-direction: row;
            width: 100px;
            margin: 0px;
            height: 430px;
            background-color: #D9D9D9;
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