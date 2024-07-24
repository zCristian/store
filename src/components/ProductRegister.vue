<template>
    <div class="register-content">
        <div class="tabs">
            <div :class="[idTab==0 ?'active-tab':'unactive-tab']" @click="activeTab(0)"><span>Descrição</span></div>
            <div :class="[idTab==1 ?'active-tab':'unactive-tab']" @click="activeTab(1)"><span>Especificação</span></div>
            <div :class="[idTab==2 ?'active-tab':'unactive-tab']" @click="activeTab(2)"><span>Estoque</span></div>
        </div>
        <div v-if="idTab==0" class="description-tab tab-content">
            <div class="fields-wrap">
                <BaseInput :label="'Nome do Produto'" v-model="product.nomeProduto"/>
                <BaseInput :label="'Marca'" v-model="product.marcaProduto"/>
                <BaseInput :label="'Preço'" :is-field-small="true" v-model="product.valor" class="price-input"/>
                <!--<div class="select-wraper">
                    <label for="categories">Categoria</label>
                    <select name="categories" class="category-select">
                        <option v-for="i in 3" :value="i" :key="i"> Categoria</option>
                    </select>
                </div>-->
                <div class="textarea-wrap">
                    <label for="description"> Descrição</label>
                    <textarea  name="description" rows="8" cols="30" v-model="product.descricaoProduto"></textarea>
                </div>
            </div>
            <div class="btn-wraper" @click="nextTab">
                <IconButton  :is-enabled="true">
                    <template #icon > <ChevronRight class="chevron-right icon"/></template>
                </IconButton>
            </div>
        </div>
        <div v-if="idTab==1" class="specs-tab tab-content" >
            <BaseInput :label="'Altura'" :is-field-small="true" v-model="product.alturaCM"/>
            <BaseInput :label="'Largura'" :is-field-small="true" v-model="product.larguraCM"/>
            <BaseInput :label="'Comprimento'" :is-field-small="true" v-model="product.comprimentoCM"/>
            <BaseInput :label="'Peso'" :is-field-small="true" v-model="product.pesoGramas"/>
            <div class="btn-wraper" @click="nextTab">
                <IconButton  :is-enabled="true" v-if="idTab!=2">
                    <template #icon > <ChevronRight class="chevron-right icon"/></template>
                    
                </IconButton>
                <IconButton class="submit icon-btn" v-if="idTab===2" :is-enabled="true">
                    <template #icon ><BadgePlus class="badge-plus icon"/></template>
                </IconButton>
            </div>
        </div>
        <div v-if="idTab==2" class="stock-tab tab-content" >
            <BaseInput :label="'Estoque Inicial'" :is-field-small="true" v-model="initialStock"/>
            <BaseInput :label="'Quantidade'" :is-field-small="true" v-model="quantity"/>
            <BaseCheckBox  :label-text="'Disponivel'" v-model="disp"/>
            <BaseCheckBox  :label-text="'Visivel'" v-model="visible" />
            <div class="btn-wraper" @click="nextTab">
                <IconButton :is-enabled="true">
                    <template #icon ><BadgePlus class="badge-plus icon"/></template>
                </IconButton>
            </div>
        </div>
    </div>

</template>

<script setup>
import {ref} from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import IconButton from '@/components/IconButton.vue';
import { ChevronRight } from 'lucide-vue-next';
import { BadgePlus } from 'lucide-vue-next';
import BaseCheckBox from '@/components/BaseCheckBox.vue';

const disp =ref(true);
const visible = ref(false);
const idTab = ref(0);
const quantity = ref("");
const initialStock = ref("");

const product = ref({
    valor : "",
    nomeProduto: "",
    marcaProdutox:"",
    descricaoProduto:"",
    pesoGramas:"",
    alturaCM:"",
    larguraCM:"",
    comprimentoCM:""
})

const activeTab = (key) =>{
    idTab.value = key;
}

const nextTab = () =>{
    if(idTab.value == 2){
        addProduct();
    }else{
        idTab.value +=1;
        
    }
}

const addProduct = () =>{
    console.log(product.value);
}
</script>

<style scoped>
.register-content{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 540px;
    box-shadow: 0px 4px 0px rgba(0,0,0,0.22);
    border: 1px solid #7F57F1;
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
    border-bottom: 3px solid #7F57F1;
    font-size: 18px;
    cursor: pointer;
}
.unactive-tab{
    height: 40px;
    width: 33.3%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(var(--primary--100));
    font-size: 18px;
    cursor: pointer;
}
.tab-content{
   display: flex;
   padding: 10px 30px; 
  
}
.description-tab{
    width: 100% ;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.fields-wrap{
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start; 
    width: 320px;
    gap: 10px;
}
.specs-tab{
    justify-content: flex-start;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
}
.stock-tab{
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
}
.textarea-wrap{
    display: flex;
    flex-direction: column;
    textarea{
        width: 296px;
        border: 1px solid rgb(var(--primary--500));
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
.select-wraper{
    display: flex;
    flex-direction: column;
    width: fit-content;
}
.category-select{
    background-color: rgba(var(--primary--100),0.3);
    height: 36px;
    border-radius: 10px;
    border: 1px solid rgb(var(--primary--500));
    padding: 0px 10px;
    font-size: 16px;
    width: 151.2px;
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
</style>

