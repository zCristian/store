<template>

    <button class="buybtn"><router-link id="productpage" to="/productpage" class="link-product">Comprar Agora</router-link><ShoppingBag class="shoppingbag"/></button>
</template>

<script setup>
    import { ShoppingBag} from 'lucide-vue-next';
</script>
<style scoped>
    .buybtn{
        
        background-color:#7F57F1 ;
        color: white;
        border-style: none;
        border-radius: 5px;
        padding: 5px 10px 5px 10px;
        width: 100%;
        font-size: 16px;
        font-family: "Montserrat", sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .shoppingbag{
        font-size: 20px;
        margin-left: 10px;
    }

    .link-product{
        text-decoration: none;
        color: white;
    }
</style>