<template>
    <div class="register-content">
        <div class="tabs">
            <div :class="[idTab==0 ?'active-tab':'unactive-tab']" @click="activeTab(0)"><span>Descrição</span></div>
            <div :class="[idTab==1 ?'active-tab':'unactive-tab']" @click="activeTab(1)"><span>Especificação</span></div>
            <div :class="[idTab==2 ?'active-tab':'unactive-tab']" @click="activeTab(2)"><span>Categorias</span></div>
        </div>
        <div v-if="idTab==0" class="description-tab tab-content">
            <div class="fields-wrap">
                <BaseInput :label="'Nome do Produto'" v-model="product.nomeProduto" :verify-blur="true" @blur-event="v$_product.nomeProduto.$touch"/>
                <span class="error-span" v-for="error in v$_product.nomeProduto.$errors" :key="error.$uid">{{error.$message }}</span>
                <BaseInput :label="'Marca'" v-model="product.marcaProduto" :verify-blur="true" 
                @blur-event="v$_product.marcaProduto.$touch"/>
                <span class="error-span" v-for="error in v$_product.marcaProduto.$errors" :key="error.$uid">{{error.$message }}</span>
                <NumberInput :label="'Preço'" v-model="product.valor" class="price-input" 
                :verify-blur="true" @blur-event="v$_product.valor.$touch"/>
                <span class="error-span" v-for="error in v$_product.valor.$errors" :key="error.$uid">{{error.$message }}</span>
                <div class="textarea-wrap">
                    <label for="description"> Descrição</label>
                    <textarea  @blur="v$_product.descricaoProduto.$touch" name="description" rows="8" cols="30" v-model="product.descricaoProduto"></textarea>
                </div>
                <span class="error-span" v-for="error in v$_product.descricaoProduto.$errors" :key="error.$uid">{{error.$message }}</span>
            </div>
            <div class="btn-wraper" @click="nextTab">
                <IconButton  :is-enabled="true">
                    <template #icon > <ChevronRight class="chevron-right icon"/></template>
                </IconButton>
            </div>
        </div>
        <div v-if="idTab==1" class="specs-tab tab-content" >
            <div class="fields-wrap">
                <div>
                    <NumberInput :label="'Altura'" v-model="product.alturaCM"
                    :verify-blur="true" @blur-event="v$_product.alturaCM.$touch"/>
                    <span class="error-span" v-for="error in v$_product.alturaCM.$errors" :key="error.$uid">{{error.$message }}</span>
                </div>
                <div>
                    <NumberInput :label="'Largura'" v-model="product.larguraCM"
                    :verify-blur="true" @blur-event="v$_product.larguraCM.$touch"/>
                    <span class="error-span" v-for="error in v$_product.larguraCM.$errors" :key="error.$uid">{{error.$message }}</span>
                </div>  
                <div>
                    <NumberInput :label="'Comprimento'"  v-model="product.comprimentoCM"
                    :verify-blur="true" @blur-event="v$_product.comprimentoCM.$touch"/>
                    <span class="error-span" v-for="error in v$_product.comprimentoCM.$errors" :key="error.$uid">{{error.$message }}</span>
                </div>
                <div> 
                    <NumberInput :label="'Peso'"  v-model="product.pesoGramas"
                    :verify-blur="true" @blur-event="v$_product.pesoGramas.$touch"/>
                    <span class="error-span" v-for="error in v$_product.pesoGramas.$errors" :key="error.$uid">{{error.$message }}</span>
                </div> 
                <div>
                    <NumberInput :is-int="true" :label="'Estoque Inicial'" v-model="product.initialStock"
                    :verify-blur="true" @blur-event="v$_product.initialStock.$touch"/>
                    <span class="error-span" v-for="error in v$_product.initialStock.$errors" :key="error.$uid">{{error.$message }}</span>
                </div>
            </div>
            
            <div class="btn-wraper" >
                <IconButton  :is-enabled="true" v-if="idTab!=2" @click="nextTab" @keyup.enter="nextTab">
                    <template #icon > <ChevronRight class="chevron-right icon"/></template>
                </IconButton>
            </div>
        </div>
        <div v-if="idTab==2" class="category-tab tab-content" >
            <CategoryFilter :product-categories="product.categorias" @select-category="handleSelectCategory" @unselect-category="handleUnselectCategory" />
            <div class="btn-wraper">
                <IconButton class="submit icon-btn" v-if="idTab===2" :is-enabled="true" @click="submitProduct()">
                        <template #icon ><Plus class="badge-plus icon"/></template>
                </IconButton>
            </div>
        </div>
    </div>

</template>

<script setup>
import {ref} from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import IconButton from '@/components/IconButton.vue';
import CategoryFilter from '@/components/CategoryFilter.vue'
import { ChevronRight } from 'lucide-vue-next';
import {Plus } from 'lucide-vue-next';
import useVuelidate from '@vuelidate/core';
import {required,helpers,decimal,integer} from '@vuelidate/validators';

const idTab = ref(0);
const axios = require('axios').default;

const product = ref({
    valor :"",
    nomeProduto: "",
    marcaProduto:"",
    descricaoProduto:"",
    pesoGramas:"",
    alturaCM:"",
    larguraCM:"",
    comprimentoCM:"",
    categorias:[],
    initialStock:"",
    
})
const required_msg = 'O campo deve ser preenchido';
const decimal_msg = 'Apenas valores decimais';
const integer_msg = 'Apenas valores inteiros';
const product_rules = {
        valor:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)     
        },
        nomeProduto:{
            required: helpers.withMessage(required_msg,required)
        },
        marcaProduto:{
            required: helpers.withMessage(required_msg,required)
        },
        descricaoProduto:{
            required: helpers.withMessage(required_msg,required)
        },
        pesoGramas:{
            required: helpers.withMessage(required_msg,required)
        },
        alturaCM:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)
        },
        larguraCM:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)
        },
        comprimentoCM:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)
        },
        initialStock:{
            integeer: helpers.withMessage(integer_msg,integer),
            required: helpers.withMessage(required_msg,required)
        } 
}
const v$_product = useVuelidate(product_rules,product);

const submitProduct = async ()=>{
    const result =await v$_product.value.$validate();
    console.log(result);
    if(result){
        addProduct();
    }else{
        idTab.value=0;
    }
}


const activeTab = (key) =>{
    idTab.value = key;
}

const nextTab = () =>{
    idTab.value +=1;
}

const addProduct = () =>{
    const addproduct_url = 'http://localhost:3000/produtos/';
    axios.post(addproduct_url,
    {
       valor : product.value.valor,
       nomeProduto : product.value.nomeProduto,
       marca : product.value.marcaProduto,
       descricaoProduto : product.value.descricaoProduto,
       pesoGramas : product.value.pesoGramas,
       alturaCM: product.value.alturaCM,
       larguraCM : product.value.larguraCM,
       comprimentoCM :product.value.comprimentoCM, 
       categorias : product.value.categorias,
       quantidadeEstoque: product.value.initialStock
    })
    .then(function(response){
        console.log(response.data.message);
    })
    .catch(function (error) {
        console.log(error);
    })
}

const handleSelectCategory = (category)=>{
    product.value.categorias.push(category);
}
const handleUnselectCategory = (category)=>{
    product.value.categorias.pop(category);
}
</script>

<style scoped>
.register-content{
    background-color: white;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 540px;
    box-shadow: 0px 2px 3px rgba(0,0,0,0.18);
    border: 1px solid rgba(var(--primary--500), 0.3);
    border-radius: 10px;
}

.tabs{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
}
.active-tab{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: 40px;
    font-weight: 500;
    color: rgb(var(--primary--700));
    border-bottom: 3px solid rgba(var(--primary--500), 0.7);
    font-size: 18px;
    cursor: pointer;
}
.unactive-tab{
    height: 40px;
    width: 33.3%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(var(--primary--500),0.75);
    font-size: 18px;
    cursor: pointer;
}
.tab-content{
   display: flex;
   padding: 10px 20px; 
  
}
.description-tab{
    width: 100% ;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .fields-wrap{
        flex-wrap: wrap;
        display: flex;
        justify-content: flex-start; 
        width: 320px;
        
        .input-wrap-wlabel{
            margin-top: 10px;
            flex-basis: 100%;
        }
    }
}

.specs-tab{
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    .fields-wrap{
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        justify-content:space-between;
        gap: 10px;
        div{
            width: 181px;
        }
    }

}
.category-tab{
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}
.textarea-wrap{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    font-family: sans-serif;
    textarea{
        width: 296px;
        border: 1px solid rgba(var(--primary--500), 0.5);
        border-radius: 10px;
        resize: none;
        padding: 8px 10px;
        font-size: 16px;
        background-color: rgba(var(--primary--100),0.3);
    }
}
.price-input{
    width: fit-content;
}

.btn-wraper{
    display: flex;
    justify-content: flex-end;
    height: 40px;
    width: 100%;
}


.icon{
    height: 32px;
    width: 32px;
    color: white;
}
.error-span{
    font-size: 12px;
    color: hsl(12, 85%, 43%);
    margin: 0px;
}
</style>

