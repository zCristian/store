<template>
    <div class="header">
        <h1>Manager Area</h1>
    </div>
    <div class="content">
        <div class="addCategory">
            <h2>Nova Categoria</h2>
            <section class="wrapper-category">

            
                <BaseInput :label="'Nome da Categoria'" :placeholder="''" v-model="nomeCategoria" :verify-blur="true" @blurEvent="handleBlur"/>
                <IconButton @click="addCategory" :isEnabled="isButtonEnabled" :class="isButtonEnabled ? 'enabled-btn':'disabled-btn'">
                    <span v-if="vuelidate.nomeCategoria.$invalid">{{ required_msg }}</span>
                    <template #icon>
                        <BadgePlus class="badge" />
                    </template>
                </IconButton>   
            </section>  
        </div>
    </div>
   
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import IconButton from '@/components/IconButton.vue'
import { BadgePlus } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import useVuelidate from '@vuelidate/core';
import {required,helpers} from '@vuelidate/validators';
import {ref,computed} from 'vue';

const toast = useToast();
const axios = require('axios').default;
const nomeCategoria = ref('');
const required_msg = 'Esse campo deve ser preenchido';

const category_rules = {
  nomeCategoria: {
    required: helpers.withMessage(required_msg, required)
  }
};

const vuelidate = useVuelidate(category_rules, { nomeCategoria });

const isButtonEnabled = computed(() => !vuelidate.value.nomeCategoria.$invalid);

const addCategory = () =>{
    const url_category = 'http://localhost:3000/categorias/';
    const response_msg = ref('');
    axios.post(url_category,{nomeCategoria:nomeCategoria.value})
    .then(function(response){
        response_msg.value = response.data.message;
        toast.success(response_msg.value);

    })
    .catch(function(error){
        if(error.response){
            response_msg.value = error.response.data.error;
            toast.error(response_msg.value);
        }
    })
}
</script>

<style scoped>
.header{
    display: flex;
    margin-left: 100px;
}
h2{
    color: #7F57F1;
}
.content{
    width: 320px;
    display: flex;
    margin: 0 100px;
    justify-content: space-between;
}
.wrapper-category{
    display:flex;
    flex-direction:row;
    justify-content: start;
    align-items: center;
    gap: 0.25rem;
}
.addCategory{
    width: 320px;
    display: flex;
    flex-direction: column;
}
.enabled-btn{
    margin-top: 20px;
    height: 44px;
    aspect-ratio: 1;
    border-radius: 10px;
    background: transparent;

    &{
        color: #7F57F1;
        transition: all 0.3s ease-in-out;
        &:hover{
            background:rgba(127, 87, 241, 0.2) ;
        }
    }
}
.disabled-btn{
    margin-top: 20px;
    height: 44px;
    aspect-ratio: 1;
    border-radius: 10px;
    background: transparent;

    &{
        color: #d3c6ec;
        transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        &:hover{
            background:rgba(210, 199, 242, 0.2) ;
        }
    }
}
.badge{
    height: 30px;
    width: 30px;
}
</style>