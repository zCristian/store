<template>
    <div class="prodview-content">
        <div class="prodview-banner"> </div>
        <div class="products-container">
            <div class="filters-section"></div>
            <div class="listed-products"></div>
        </div>
    
    </div>
</template>

<script>

</script>

<style>
    .prodview-content{
        display: flex;
        justify-content: center;
        margin: 0px;
        flex-wrap: wrap;

    }

    .prodview-banner{
        background-color: #D9D9D9;
        width: 1220px;
        height: 240px;
        margin: 50px 0px;
        display: flex;
        align-items: center;
    }

    .products-container{
        width: 1220px;
        display: flex;
        justify-content: space-between;
        margin: 0px;
    }
    .filters-section{
        width:240px ;
        height: 990px;
        background-color: #D9D9D9;
        margin: 0px;
    }
    .listed-products{
        width:950px ;
        height:1350px;
        background-color: #D9D9D9;
        margin:0px;
    }
</style>