<template>
    <div >
        <router-link :to="btnsrc" v-slot="navigate">
            <button @click="navigate" 
            :class="[isExclude?'exclude-btn':'default-btn',isSmall?'small-btn':'normal-btn']">
                {{btntext}}
            </button>
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
            default:"#"
        },
        isSmall:{
            type:Boolean,
            default: false
        },
        isExclude:{
            type:Boolean,
            default:false
        }
    });
   
</script>

<style scoped>
.default-btn{
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-size: 18px;
    height: 42px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: white;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
    background-color: rgb(var(--primary--500));
    &:hover{
        background-color: rgb(var(--primary--600));
    }
}
.exclude-btn{
    border: none;
    height: 42px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
    color: white;
    background-color: hsl(0, 90%, 44%);
    &:hover{
        background-color: hsl(0, 92%, 38%);
    }
}
.normal-btn{

    width: 320px;
 }
 .small-btn{
    width: 150px;
 }
 a{
    text-decoration: none;
 }
</style>