<template>
    <div class="card">
        <div class="bookmarkdiv">
            <BookMarkButton/>
        </div>
        <div class="thumbnail"><img src="../assets/img/iphone.jpg" ></div>
        <div class="cardcontent">
            <span class = "category">{{ product.category }}</span>
            <h3 class="title">{{ product.title}}</h3>
            
            <span class="ratings">Avaliação:{{ product.rating }}</span>
            <span class="reviews">(35 reviews)</span> 
           
            <span class="pricespan"><s>${{ product.price }}</s></span>
            <span class="discprice">${{(product.price - ( product.price * product.discountPercentage/100)).toFixed(2)}}</span>

            <span class="discount">5% de desconto no PIX</span>
        </div>
        <div class="btnsection">
            <BuyButton/>
           
        </div>
    </div>

</template>
<script setup>  
    import BuyButton from '../components/BuyButton.vue'
    import BookMarkButton from '../components/BookMarkButton.vue'
    import { defineProps} from 'vue';

    const props = defineProps({
        product:{
            type:Object,
            required:true
        }
    });
    
    console.log(props);
    //console.log(product.thumbnail)
</script>
<style scoped>
    .card{
        border-radius: 10px;
        background: #ffff;
        box-shadow:  10px 10px 20px #cacaca,
             -10px -10px 20px #f2f2f2;
        height: 515px;
        display: flex;
        
        flex-wrap: wrap;
        padding: 5px 5px 5px 5px;
        width: 255px;
        
       
    }
    .bookmarkdiv{
        margin-bottom: 2px;
    }
    .thumbnail{
        display: flex;
        justify-content: center;
        flex-basis: 100%;
    }
    img{
        width: 180px;
        height: 240px;
        border-radius: 5px;
       
    }
    .cardcontent{
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        margin: 10px 10px 0px 10px;
        height: 170px;
        text-align: left;
    }
    .title{
        flex-basis: 100%;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    
    .btnsection{
        display: flex;
        align-self: flex-end;
        justify-content: center;
        height: 48px;
        margin: 5px;
        flex-basis: 100%;
    }
    .category{
        border-radius: 5px;
        background-color: #E5DDFC;
        color: #7F57F1;
        padding: 4px 8px 4px 8px;
    }
    .pricespan{
        color: grey;
        font-size: 21px;
        flex-basis: 35%;

    }
    .discprice{
        color: #7F57F1;
        font-size: 22px;
        flex-basis: 65%;
    }
    .reviews{
        font-size: 16px;
        flex-basis: 50%;
    }
    .ratings{
        font-size: 16px;
        flex-basis: 50%;
    }
    .discount{
        align-self: flex-end;
        font-size: 16px;
        flex-basis: 100%;
       
    }
</style>