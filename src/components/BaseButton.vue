<template>
    <router-link :to="btnsrc" v-slot="navigate">
        <button @click="navigate">{{btntext}}</button>
    </router-link>
</template>

<script setup>
import { defineProps} from 'vue';
    const btnsrc = "/";

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