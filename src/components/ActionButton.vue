<template>
        <button>{{btntext}}</button>
</template>

<script setup>
import { defineProps} from 'vue';
    defineProps({
        btntext:{
            type : String,
            required : true
        },
    });

</script>

<style scoped>
 button{
    color: white;
    border: none;
    border-radius: 10px;
    background-color: rgb(var(--primary--500));
    width: 320px;
    padding: 10px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
    &:hover{
        background-color: rgb(var(--primary--600));
    }
 }
 a{
    text-decoration: none;
 }
</style>