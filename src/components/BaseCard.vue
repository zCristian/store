<template>
    <div class="card-wrap">
        <div class="bookmark-div">
            <BookMarkButton @click="productLiked()"/>
        </div>
        <div class="card-image"><img src="../assets/img/default_cover.png" ></div>
        <div class="card-content">
            <div class="categories-wrap">
                <span v-for="category in product.categorias" :key="category.codigoCategoriaa" 
                class = "category-span">{{ category.nomeCategoria }}</span>
            </div>
            
            <div class="produtc-info">
                <h3 class="product-name">{{ product.nomeProduto}}</h3> 
                <span>{{ product.descricaoProduto}}</span>
            </div>
            
            
            <div class="ratings-wrap">
              <span class="product-ratings">Avaliação:{{ product.nota }}</span>
              <span class="product-reviews">(0 reviews)</span>   
            </div>
            
            <div class="prices-wrap">
              <span class="product-price"><s>${{ product.valor }}</s></span>
              <span class="product-discountprice">${{ product.valor}}</span>  
            </div>
            

            <span class="product-discount">5% de desconto no PIX</span>
        </div>
        <BuyButton/>
    </div>

</template>
<script setup>  
    import BuyButton from '../components/BuyButton.vue'
    import BookMarkButton from '../components/BookMarkButton.vue'
    import { defineProps, ref, defineEmits} from 'vue';

    const props = defineProps({
        product:{
            type:Object,
            required:true
        }
    });
    
    
    const savedProducts = ref([]);

    const emit = defineEmits('productLiked');
    const productLiked = () =>{
        savedProducts.value.push(props.product.id)
        emit('productLiked',savedProducts.value);
    }

</script>
<style scoped>
    .card-wrap{
        border-radius: 8px;
        background: #ffff;
        box-shadow: 0px 3px 3px 0px rgba(var(--primary--black),0.15);
        border: 1px solid rgba(var(--primary--500),0.22);
        height: 497px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        padding: 12px;
        width: 270px;
        gap: 12px;
    }
    .bookmark-div{
        position: absolute;
    }
    .card-image{
        display: flex;
        justify-content: center;
        width: 100%;
    }
    img{
        width: 245px;
        height: 245px;
        border-radius: 5px;
       
    }
    .card-content{
        display: flex;
        flex-direction: column;
        gap:12px ;
        h3{
            margin:0px;
            font-size: 20px;
            color: rgba(var(--primary--black),0.85);

        }
    }
    .categories-wrap{
        display: flex;
        gap: 5px;
    }
    .category-span{
        border-radius: 8px;
        background-color: #E5DDFC;
        color: #7F57F1;
        padding: 4px 8px;
        font-size: 14px;
        width: fit-content;
    }
    .prices-wrap{
        display: flex;
        align-items: center;
        gap: 10px;
        .product-price{
            color: rgb(var(--primary--300));
        }
        .product-discountprice{
            font-size: 20px;
            font-weight: 600;
            color: rgb(var(--primary--500));
        }
    }
</style>