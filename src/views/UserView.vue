<template>
    <div class="head">  
    </div>
    <div class="main">
        <div class="client container">
        <h2>Usuário</h2>
            <form class="clientform">
                <input   class="name field" type="text" placeholder="Nome" v-model="cliente.nomeCliente" disabled>
                <input   class="phone field" type="text" placeholder="Celular" v-model="cliente.celularCliente" disabled>
                <input   class="email field" type="text" placeholder="E-mail" v-model="cliente.emailCliente" disabled>
                <BaseButton :btntext="btntext" />
            </form>
        </div>
        <div class="address container">
            <h2>Endereços</h2>
            <form class="addressform">
             <input   class="zip field" type="text" placeholder="CEP" v-model="cep" @blur="checkCep">
             <input   class="street field" type="text" placeholder="Rua" v-model="nomeRua" >
             <input   class="number sm-field" type="text" placeholder="Numero" v-model="numeroCasa">
             <input   class="complement field" type="text" placeholder="Complemento" v-model="complemento" >
             <input   class="neighborhood field" type="text" placeholder="Bairro" v-model="bairro" >
             <input   class="city field" type="text" placeholder="Cidade" v-model="cidade" >
             <input   class="state sm-field" type="text" placeholder="Estado" v-model="estado">

             <BaseButton :btntext="AddresBtnTXT"/>
            </form>
            
        </div>
    </div>
  
    
    <slot></slot>
</template>

<script setup>

    import BaseButton from '@/components/BaseButton.vue';
    import {ref, defineProps} from 'vue';
    const axios = require('axios').default;
    const btntext = ref('Editar Informações');
    const AddresBtnTXT = ref('Adicionar Novo Endereço');
    const props = defineProps({
        codigoCliente: {
            type : String,
            required : false
        }
    });
    const cliente = ref({
    });
    const cep = ref('');
    const nomeRua = ref('');
    const numeroCasa = ref('');
    const complemento = ref('');
    const bairro = ref('');
    const cidade = ref('');
    const estado = ref('');

    const url_login = 'http://localhost:3000/cliente/'+props.codigoCliente;
    axios.get(url_login)
    .then(function(response){
        cliente.value = response.data.result;
        console.log(cliente.value);
    })
    
    const checkCep =()=>{
        cep.value = cep.value.replace(/\D/g, '');
        console.log(cep.value);
        if(cep.value!='' && cep.value.length == 8 ){
            fetch(`https://viacep.com.br/ws/${cep.value}/json/`).then(res =>res.json()).then(data=>{
                nomeRua.value = data.logradouro;
                complemento.value = data.complemento;
                bairro.value = data.bairro;
                cidade.value = data.localidade;
                estado.value = data.uf;
            });
        }
        
    }
</script>

<style scoped>
    .head{
        margin-top: 80px;
        display: flex;
        justify-content: center;
    }
    .main{
        display: flex;
        justify-content: space-around;

    }
    .clientform{
        margin: 10px 0px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 15px;
    }
    .addressform{
        margin: 10px 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 500px;
        gap: 15px;
    }
    .sm-field{
        width: 70px;
        height: 39px;
        font-size: 16px;
        border: 2px solid #7F57F1;
        border-radius: 10px;
        padding: 0px 10px;
        background-color: #F1EFF8;
    }
    .field{
        height: 39px;
        font-size: 16px;
        border: 2px solid #7F57F1;
        border-radius: 10px;
        width: 296px;
        padding: 0px 10px;
        background-color: #F1EFF8;
    }
    h2{
        color: #7F57F1;
    }
</style>