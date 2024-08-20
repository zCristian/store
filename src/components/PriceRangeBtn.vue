<template>

    <div class="prdiv">
        <h3>{{btnMessage }} R$ {{ pricerange }}</h3>
    </div>

    
</template>
<script setup>
    import {defineProps,computed} from 'vue';

    const props = defineProps({
        pricerange:{
            type:Number,
            required:true
        }
    });
    

    const btnMessage = computed(()=>{
        return props.pricerange >2999 ? 'Acima de' : 'Até'
    })
</script>

<style scoped>
    .prdiv{
        height: 90px;
        border-radius: 5px;
        padding: 5px 10px 5px 10px;
        color: #7F57F1;
        background-color: #E5DDFC;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-basis: 22%;
        font-size: 23px;
        cursor: pointer;
    }
</style>