<template>
    <div class="buybtn-wrap">
        <button class="buy-btn"><router-link id="productpage" to="/productpage" class="link-product">Comprar Agora</router-link><ShoppingBag class="shoppingbag"/></button>    
    </div>
    
</template>

<script setup>
    import { ShoppingBag} from 'lucide-vue-next';
</script>
<style scoped>
.buybtn-wrap{
    width: 100%;
}
.buy-btn{
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 24px;
    height: 48px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: white;
    font-size: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.22);
    background-color: rgb(var(--primary--500));
    &:hover{
        background-color: rgba(var(--primary--600));
    }
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