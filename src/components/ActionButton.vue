<template>
        <button>{{btntext}}</button>
</template>

<script setup>
import { defineProps} from 'vue';
    const props = defineProps({
        btntext:{
            type : String,
            required : true
        },
    });
   
    console.log(props.btntext);
</script>

<style scoped>
 button{
    color: white;
    border: none;
    border-radius: 10px;
    background-color: #7F57F1;
    width: 320px;
    padding: 10px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
 }
 a{
    text-decoration: none;
 }
</style>