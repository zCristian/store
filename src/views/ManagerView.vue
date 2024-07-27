<template>
    <div class="content">
        <h1>MANAGER AREA</h1>
        <div class="addCategory">
            <h2>Nova Categoria</h2>
            <section class="addcategory-wraper">
                <BaseInput @keydown.enter="addCategory" :label="'Nome da Categoria'" :placeholder="''" v-model="nomeCategoria"/>
                <IconButton :isDark="false" @click="addCategory" :is-enabled="isButtonEnabled">
                    <span v-if="vuelidate.nomeCategoria.$invalid">{{ required_msg }}</span>
                    <template #icon>
                        <BadgePlus class="badge" />
                    </template>
                </IconButton>   
            </section>  
        </div>
        <div class="registered-categories">
            <h2>Categorias Cadastradas</h2>
            <BaseAccordion :categories="categories" @delete-category="handleDeleteCategory" />
        </div>
        <div class="addProduct">
            <h2>Novo Produto</h2>
            <ProductRegister/>
        </div>
    </div>  
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue';
import IconButton from '@/components/IconButton.vue';
import ProductRegister from '@/components/ProductRegister.vue';
import BaseAccordion from '@/components/BaseAccordion.vue';
import { BadgePlus } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import useVuelidate from '@vuelidate/core';
import {required,helpers} from '@vuelidate/validators';
import {ref,onBeforeMount,computed,provide} from 'vue';

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

const isButtonEnabled = computed(()=>!vuelidate.value.nomeCategoria.$invalid);
const categories = ref();
provide('allcategories',categories);

onBeforeMount(()=>{
    loadCategories();
})
const loadCategories = ()=>{
   const url_categories = 'http://localhost:3000/categorias/';
    axios.get(url_categories).then(function(response){
        categories.value = response.data.result;
    })
    .catch(function(error){
        if(error.response){
            categories.value =[];
        }
    }); 
}

const addCategory = () =>{
    const url_category = 'http://localhost:3000/categorias/';
    const response_msg = ref('');
    axios.post(url_category,{nomeCategoria:nomeCategoria.value})
    .then(function(response){
        response_msg.value = response.data.message;
        categories.value.push({'codigoCategoria':'','nomeCategoria':nomeCategoria.value});
        loadCategories();
        toast.success(response_msg.value);

    })
    .catch(function(error){
        if(error.response){
            response_msg.value = error.response.data.error;
            toast.error(response_msg.value);
        }
    })
}

const handleDeleteCategory=()=>{
    loadCategories();
}

</script>

<style scoped>

h1{
    font-size: 25px;
    grid-column-start: second;
    grid-row-start: first;

}
h2{
    color: #7F57F1;
}
.content{
    margin-top: 20px;
    display: grid;
    grid-template-columns: [first] auto [second] 450px [third] 220px [fourth] 450px [fifth] auto;
    grid-template-rows: [first]60px [second] 150px [third] 700px;
}
.addcategory-wraper{
    background-color: white;
    border-radius: 8px;
    width: 500px;
    height: 70px;
    border: 1px solid rgba(var(--primary--500),0.3);
    box-shadow: 0px 2px 3px  rgba(0,0,0,0.18);
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items:flex-end;
    padding: 10px 20px;
    gap: 0.25rem;
}
.addCategory{
    grid-column-start: second;
    grid-row-start: second;
    width: fit-content;
    display: flex;
    flex-direction: column;
}

.badge{
    height: 30px;
    width: 30px;
}
.addProduct{
    grid-row-start: third;
    grid-column-start: second;
}

.registered-categories{
    grid-column-start: fourth;
    grid-row-start: second;
    width: fit-content;
}
</style>