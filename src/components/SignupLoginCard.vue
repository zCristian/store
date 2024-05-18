<template>
        <div class="card-container">
            <div class="register-card">
                <div class="card-function">
                    <span :class="{selected:loginSelected}" @click="switchFunction(0) ">Entre </span> ou<span  :class="{selected:!loginSelected}" @click="switchFunction(1)"> cadastre-se</span>
                </div>
                <hr class="head-hr">
                <div class="card-content">
                    <h2>Bem vindo a Celulou</h2>
                        <form v-if="isSignUp" class="register-form cardform"  @submit.prevent="onSignUp()" >
                            <input   class="cpf field" type="text" placeholder="CPF" v-model="cpfCliente">
                            <input   class="name field" type="text" placeholder="Nome" v-model="nomeCliente">
                            <input   class="phone field" type="text" placeholder="Celular" v-model="celularCliente" >
                            <input   class="email field" type="text" placeholder="E-mail" v-model="emailCliente">
                            <input  v-if="false" class="password field" type="password" placeholder="Senha">
                            
                            <BaseButton :btntext="btntext" @click="onSignUp()" @keyup.enter="onSignUp()" />
                       
                        </form>
                        <form v-if="!isSignUp" class="login-form cardform" @submit.prevent="onLogin()">
                            <input   class="email field" type="text" placeholder="E-mail" v-model="emailCliente">
                            <BaseButton :btntext="btntext" @click="onLogin()" @keyup.enter="onLogin()" />
                        </form>
                </div>
                <div class="separation">
                    <hr>ou<hr>
                </div>
                <div class="socials">
                    <h5>Continue com</h5>
                    <button class="google-login"> <img src="../assets/icon/googlesvg.svg" ></button>
                </div>
            </div>
        </div>
</template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import {ref,defineEmits} from 'vue';
import { useToast } from 'vue-toastification';

const cliente = ref({
    codigoCliente : '',    
    cpfCliente : '',
    nomeCliente :'',
    celularCliente : '',
    emailCliente : '',
    createdAt :''
});
const toast = useToast();
const response_msg = ref('');
const axios = require('axios').default;
const cpfCliente = ref('');
const nomeCliente = ref('');
const celularCliente = ref('');
const emailCliente = ref('');

const isSignUp = ref(false);
const loginSelected= ref(true);
const btntext = ref("Entrar")


let switchFunction = (index) =>{
    if(index==0){
        isSignUp.value = false;
        loginSelected.value = true;
        btntext.value = "Entrar";
    }else{
        isSignUp.value = true;
        loginSelected.value = false;
        btntext.value = "Cadastrar";
    }
}
const emit = defineEmits(['closeCard','succes_signup','error_signup','succes_login','error_login']);

let resetFields = () =>{
    cpfCliente.value='';
    emailCliente.value='';
    nomeCliente.value='';
    celularCliente.value='';
}
let closeCard = () =>{
    emit('closeCard');
}

const onSignUp =()=>{
   const url_cliente = 'http://localhost:3000/cliente';
   axios.post(url_cliente,{
        nomeCliente :nomeCliente.value,
        cpfCliente: cpfCliente.value,
        celularCliente : celularCliente.value,
        emailCliente : emailCliente.value
    })
    .then(function(response){
        response_msg.value = response.data.message;
        toast.success(response_msg.value);
        emit('succes_login');
        switchFunction(0);
        resetFields();
        
    })
    .catch(function(error){
        if(error.response){
            response_msg.value = error.response.data.error;
            toast.error(response_msg.value);
            emit('error_signup');
            
        }
    })
   
}

const onLogin = () =>{
    const url_login = 'http://localhost:3000/login';
    axios.post(url_login,{
        email :emailCliente.value
    })
    .then(function(response){
        response_msg.value = "Bem Vindo";
        toast.success(response_msg.value);
        cliente.value = response.data.result;
        resetFields();
        closeCard();
        emit('succes_login',cliente);
    })
    .catch(function(error){
        if(error.response){
            response_msg.value = "Erro no Login";
            toast.error(response_msg.value);
            emit('error_login');
        }
    })
}

</script>

<style scoped>




.close-div{
    display: flex;
    justify-content: flex-end;
    
}
.close-btn{
    color: #7F57F1;
    border: none;
    cursor: pointer;
    
}
.card-function{
    width: 296px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    font-size: 15px;
}
.head-hr{
    width: 320px;
}

.card-content{
    width: 320px;
}
.cardform{
    margin: 10px 0px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
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
span{
    font-weight: bold;
    cursor: pointer;

}
h2{ 
    border: none;
    margin: 0px;
    color: #7F57F1;
    font-size: 18px;
    display: flex;
    align-items: flex-start;
    
}
.separation{
    width: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    hr{
        width: 150px;
        background-color: black;
        height: 0px;
        margin: 0px;
    }
}
.socials{

    margin-top: 5px;
    display: flex;
    width: 320px;
    flex-direction: column;

    img{
        height: 36px;
        width: 36px;
    }
}
.google-login{
    border-radius: 10px;
    border: none;
    font-size: 18px;
    display: flex;
    gap: 10px;
    width: 320px;
    height: 42px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #E6E6E6;
    border: 2px solid #7F57F1;
}
.selected{
    color: #7F57F1;
}
h5{
    margin:5px;
}
</style>