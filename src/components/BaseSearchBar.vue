<template>
    <div class="search-wrap">
        <Search class="search-icon"/>
        <input  class="search-field" type="text" 
        :value="modelValue" :placeholder="placeholder" @input="handleInput" @keyup.enter="handleFilterCategory(modelValue)">
    </div>

</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import {Search} from 'lucide-vue-next';
const axios = require('axios').default;
defineProps({
    placeholder: {
        type: [String],
        default: ""
    },
    modelValue: {
        type: [String],
        default: ""
    }
});

const emit = defineEmits(['update:modelValue','exhibited-categories']);
const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
    handleFilterCategory(event.target.value);
};


const handleFilterCategory = (filter) =>{
    const url_category_filter = 'http://localhost:3000/categorias/'+filter;
    axios.get(url_category_filter).then(function(response){
        const exhibitedCategories = response.data.result
        emit('exhibited-categories',exhibitedCategories);
    }).catch(function(error){
        console.log(error);
    })
}

</script>


<style scoped>

.search-wrap{
    height: 42px;
    display: flex;
    width: 100%;
    border-radius: 8px;
    border: 1px solid rgba(var(--primary--500), 0.7);
    background-color: rgba(var(--primary--100), 0.3);   
    align-items: center;
    justify-content: flex-start;
    padding: 0px 10px;
}
.search-icon{
    color: rgb(var(--primary--500));
}
.search-field{
    font-size: 17px;
    height: 42px;
    width: 96%;
    background-color: rgba(var(--primary--100), 0.080);
    box-shadow: none;
    outline: none;
    border-style: none;
    padding: 0px 10px;
}

</style>