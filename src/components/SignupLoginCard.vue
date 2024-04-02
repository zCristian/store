<template>
    <div class="registration">
    
        <div class="register-card">
            <div class="close-div">
                <CircleX class="close-btn"/>
            </div>
            <div class="card-function">
                <span @click=switchFunction(2)>Entre </span> ou<span @click="switchFunction(1) "> cadastre-se</span>
            </div>
            <hr class="head-hr">
            <div class="card-content">
                <h2>Bem vindo a Celulou</h2>
                <input class="email field" type="text" placeholder="E-mail">
                <input class="password field" type="password" placeholder="Senha">
                <BaseButton/>
            </div>
            <div class="separation">
                <hr>ou<hr>
            </div>
            <div class="socials">
                <button class="google-login">Entre com <img src="../assets/icon/googlesvg.svg"></button>
            </div>
        </div>
</div>
</template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import { CircleX } from 'lucide-vue-next'
let switchFunction = (index) =>{
    if(index==1){
        console.log("Signup");
    }else{
        console.log("Login")
    }
}
</script>

<style>
.registration{
    display: flex;
    justify-content: center;
    margin: 50px 0px;
}
.register-card{
    width: 350px;
    border: 1px solid black;
    border-radius: 20px;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.close-div{
    display: flex;
    justify-content: flex-end;
    width: 320px;
}
.close-btn{
    color: #7F57F1;
    border: none;
    
}
.card-function{
    width: 320px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    font-size: 15px;
}
.head-hr{
    width: 320px;
}

.card-content{
    margin: 10px 0px;
    width: 320px;
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
        height: 0.5px;
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
}
</style>