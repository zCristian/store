<template>
        <div class="dropdown-wrapper" @click="switchDropDown()" ref="dropDown" >
            <slot name="icon" ></slot>
            <div class="options-wrapper" v-if="isDropDownVisible" >
                <div class="dropdown-selected">
                    <slot name="header"></slot>
                </div>
                <div class="option" v-for="(option,index) in options" :key="index" @click="selectOption(option)">
                    {{ option.name}}
                </div>
            </div>
        </div>
</template>

<script setup>
    import { onClickOutside } from '@vueuse/core';
    import { defineProps, defineEmits,ref} from 'vue';
    import router from '../router/index.js';


    const dropDown  = ref(null);
    const emit  = defineEmits(['logout']);
    const props = defineProps({
        options:{
            Type:Array,
            required: true
        }
    });
    
    console.log(props.options);
    const isDropDownVisible = ref(false);
    const selectOption = (option)=>{
        if(option.src ==='home'){
            emit('logout');
        }
        router.push({name: option.src, params: {codigoCliente:option.params}});   
    }

    const switchDropDown = () =>{
        isDropDownVisible.value = !isDropDownVisible.value;
    }

    const closeDropDown = ()=>{
        isDropDownVisible.value = false;
    }

    onClickOutside(dropDown,closeDropDown);
</script>

<style scoped>
    .dropdown-wrapper{
        cursor: pointer;
        max-width: 150px;
        margin: 0px;
        color: #7F57F1;
    }
    .dropdown-selected{
        border-bottom: 1px solid #7F57F1;
        color: black;
        background-color: white;
        display: flex;
        flex-wrap: wrap;
        padding: 8px 8px;
        padding-top: 0px;
        font-weight: 600;
        
    }
    .options-wrapper{
        border-radius: 8px;
        padding: 8px;
        background-color: white;
        -webkit-box-shadow: 7px 11px 15px 4px rgba(0,0,0,0.3);
        -moz-box-shadow: 7px 11px 15px 4px rgba(0,0,0,0.3);
        box-shadow: 7px 11px 15px 4px rgba(0,0,0,0.3);
    }
    .option:hover{
        background:#CCBCF9;
        color: white;
        font-size: 17px;
    }

    .option{
        color: black;
        margin-top: 10px;
        width: 100px;
        background-color: white;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 8px;
    }

    .option:last-of-type{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>