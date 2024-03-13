<template>
    <div class="card">
        <div class="img"><img src=""></div>
        <div class="content"><p>{{ productName }}</p></div>
    </div>

</template>
<script setup>  
    import { defineProps} from 'vue';
    const props = defineProps({
        productName:{
            type:Text,
            required:true
        }
    });
    console.log(props);

</script>
<style>
    .card{
        border-radius: 5px;
        background: #dedede;
        box-shadow:  10px 10px 20px #cacaca,
             -10px -10px 20px #f2f2f2;
        height: 275px;
    }
    
</style>