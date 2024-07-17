<template>
        <div class="card-container">
            <div class="register-card">
                <div class="card-function">
                    <span :class="{selected:loginSelected}" @click="switchFunction(0) ">Entre </span> ou<span  :class="{selected:!loginSelected}" @click="switchFunction(1)"> cadastre-se</span>
                </div>
                <hr class="head-hr">
                <div class="card-content">
                    <h2>Bem vindo a Celulou</h2>
                        <form v-if="isSignUp" class="register-form cardform" @click="verifyForm">
                            <div class="cpf-wrapper">
                                <CPFInput class="cpf" :placeholder="'CPF'" v-model="cliente.cpfCliente"/>
                                <span class="input-gap" v-if="!v$_user.cpfCliente.$error"></span>
                                <span class="field-error" v-for="error in v$_user.cpfCliente.$errors" :key="error.$uid">{{ error.$message }}</span>
                            </div>
                            <div class="name-wrapper">
                                <BaseInput class="name" :placeholder="'Nome'" v-model="cliente.nomeCliente"/>
                                <span class="input-gap" v-if="!v$_user.nomeCliente.$error"></span>
                                <span class="field-error" v-for="error in v$_user.nomeCliente.$errors" :key="error.$uid">{{ error.$message }}</span>
                            </div>
                            
                            <div class="phone-wapper">
                                <CellInput class="phone"  :placeholder="'Celular'" v-model="cliente.celularCliente"/>
                                <span class="input-gap" v-if="!v$_user.celularCliente.$error"></span>
                                <span class="field-error" v-for="error in v$_user.celularCliente.$errors" :key="error.$uid">{{ error.$message }}</span>
                            </div>
                            
                            <div class="email-wrapper">
                                <BaseInput class="email" :placeholder="'E-mail'" v-model="cliente.emailCliente"/>
                                <span class="input-gap" v-if="!v$_user.emailCliente.$error"></span>
                                <span class="field-error" v-for="error in v$_user.emailCliente.$errors" :key="error.$uid">{{ error.$message }}</span>
                            </div>
                           
                            <BaseInput v-if="false" class="password"  :placeholder="'Senha'"/>
                            <ActionButton :btntext="btntext" @click="submitSignUpForm" @keyup.enter="submitSignUpForm" />
                       
                        </form>
                        <form v-if="!isSignUp" class="login-form cardform" @submit.prevent="onLogin()">
                            <BaseInput class="email" :placeholder="'E-mail'" v-model="cliente.emailCliente"/>
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
import BaseInput from './BaseInput.vue';
import CellInput from './CellInput.vue';
import CPFInput from './CPFInput.vue';
import {ref,defineEmits} from 'vue';
import { useToast } from 'vue-toastification';
import useVuelidate from '@vuelidate/core';
import {required, minLength,helpers,maxLength,email} from '@vuelidate/validators';
import ActionButton from './ActionButton.vue';

const cliente = ref({
    codigoCliente : '',    
    cpfCliente : '',
    nomeCliente :'',
    celularCliente : '',
    emailCliente : '',
    createdAt :''
});
const required_msg = "Esse campo deve ser preenchido";
const userMinLength_msg = "O campo deve ter ao menos 5 caracteres";
const isCPF_msg = "Insira um CPF válido"
const isEmail_msg = "Insira um email válido";
const isPhone_msg = "Insira um número de celular válido";
// User Form Validation
const user_rules = {
    cpfCliente:{
        required: helpers.withMessage(required_msg,required),
        minLength:helpers.withMessage(isCPF_msg,minLength(11)),
    },
    nomeCliente : {
        required: helpers.withMessage(required_msg,required),
        minLength:helpers.withMessage(userMinLength_msg,minLength(5))
    },
    celularCliente: {
        required: helpers.withMessage(required_msg,required),
        minLength:helpers.withMessage(isPhone_msg,minLength(11)),
        maxLength:helpers.withMessage(isPhone_msg,maxLength(14))
    },
    emailCliente: {
        required: helpers.withMessage(required_msg,required),
        email: helpers.withMessage(isEmail_msg,email)
    },
}

const v$_user = useVuelidate(user_rules,cliente);

const verifyForm = async () => {
    await v$_user.value.$validate();
}


const submitSignUpForm = async () => {
    const result =await v$_user.value.$validate();
    if(result){
        onSignUp();
    }
}

const toast = useToast();
const response_msg = ref('');
const axios = require('axios').default;

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
    cliente.value.cpfCliente='';
    cliente.value.emailCliente='';
    cliente.value.nomeCliente='';
    cliente.value.celularCliente='';
}
let closeCard = () =>{
    emit('closeCard');
}

const onSignUp =()=>{
   const url_cliente = 'http://localhost:3000/clientes';
   axios.post(url_cliente,{
        nomeCliente :cliente.value.nomeCliente,
        cpfCliente: cliente.value.cpfCliente,
        celularCliente : cliente.value.celularCliente,
        emailCliente : cliente.value.emailCliente
    })
    .then(function(response){
        response_msg.value = response.data.message;
        toast.success(response_msg.value);
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
        email :cliente.value.emailCliente
    })
    .then(function(response){
        response_msg.value = "Bem Vindo";
        toast.success(response_msg.value);
        cliente.value.codigoCliente = response.data.result.codigoCliente;
        resetFields();
        closeCard();
        emit('succes_login',cliente.value.codigoCliente);
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
}
.input-wrap{
        display: flex;
}
.input-gap{
    height: 18px;
    width: 300px;
    display: inline-block;
}
.field-error{
    margin-bottom:5px;
    padding-left: 7px;
    height: 13px;
    font-size: 13px;
    color: red;
    display: inline-block;
    font-weight: 400;
}
.login-form{
    gap: 15px;
}
span{
    font-weight: bold;
    cursor: pointer;
    margin: 0px;
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