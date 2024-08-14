<template>
    <div >
        <router-link :to="btnsrc" v-slot="navigate">
            <button @click="navigate" 
            :class="[isLight?'light-btn':'dark-btn',{'exclude-btn':isExclude},
            isSmall?'small-btn':'normal-btn']">
                <slot name="icon">

                </slot>
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
        },
        isLight:{
            type:Boolean,
            default:false
        }
    });
   
</script>

<style scoped>
.dark-btn{
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    height: 42px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: white;
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.22);
    background-color: rgb(var(--primary--500));
    &:hover{
        background-color: rgba(var(--primary--600));
    }
}
.light-btn{
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    height: 42px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: rgba(var(--primary--black),0.8);
    font-weight: 400;
    border: 1px solid rgba(var(--primary--500),0.25);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.18);
    background-color: white;
    &:hover{
        background-color: rgba(var(--primary--100),0.5);
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
    background-color: hsl(11, 85%, 43%);
    &:hover{
        background-color: hsl(11, 87%, 38%);
    }
}
.normal-btn{
    font-size: 20px;
    width: 320px;
 }
 .small-btn{
    font-size: 20px;
    gap: 10px;
    width: 140px;
 }
 a{
    text-decoration: none;
 }
</style>