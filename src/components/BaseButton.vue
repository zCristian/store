<template>
    <div >
        <router-link :to="btnsrc" v-slot="navigate">
            <button @click="navigate">{{btntext}}</button>
        </router-link>
    </div>
</template>

<script setup>
import { defineProps} from 'vue';
    

    defineProps({
        btntext:{
            type : String,
            required : true
        },
        btnsrc:{
            type:String,
            default:"/#"
        }
    });
   
</script>

<style scoped>
 button{
    color: white;
    border: none;
    border-radius: 10px;
    background-color: #7F57F1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8px 16px;
    font-size: 18px;
    cursor: pointer;
 }
 a{
    text-decoration: none;
 }
</style>