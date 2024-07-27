<template>
  <nav class="navbar">
    <div class="logodiv">
      <router-link to="/"><img src="../src/assets/logo.svg" alt="logo"></router-link> 
      </div>
      <div class="searchdiv">
          <input type="text" class="searchbar">
          <button class="searchbtn"><Search/>Buscar</button>
      </div>
    <div class="icondiv">
      <router-link to="/favorites" class="favlink"><Heart/><p>Favoritos</p></router-link>
      <router-link to="/cart" class="cartlink"><ShoppingBag/><p>Itens</p></router-link>
      <div class="usericon-div">
        <router-link v-if="isLoged==false" id="userbtn" to="" class="userlink" @click="isModalOpen=true"><User/><p>{{ userName }}</p></router-link>
        <BaseDropDown v-if="isLoged" :options="options" @logout="handlelLogOut()" >
            <template #icon><CircleUserRound class="userlink"/></template>
            <template #header><p class="dropmenu-username">{{ userName }}</p></template>
        </BaseDropDown>
      </div>
    </div>
  </nav>
  <div class="brandsdiv">
      <div class="brandspan">
        <router-link v-for="brand in brands" :key="brand" to="/products"><span >{{brand}}</span></router-link>
        <span class="offers"><BadgePercent/>Ofertas</span>
      </div>
    </div>
  <router-view></router-view>
  <BaseModal :isModalOpen="isModalOpen" @close-modal="isModalOpen=false">
    <template #main>
      <SignupLoginCard  class="login-card"  @succes_login="handleSuccesLogin"/>
    </template>
  </BaseModal>
  <PageFooter/>
</template>


<script setup>
  import SignupLoginCard from '../src/components/SignupLoginCard.vue';
  import PageFooter from '../src/components/PageFooter.vue';
  import BaseModal from './components/BaseModal.vue';
  import BaseDropDown from './components/BaseDropDown.vue';
  import { ShoppingBag,Heart,User,BadgePercent, CircleUserRound} from 'lucide-vue-next';
  import {ref, watch} from 'vue';
  import { Search } from 'lucide-vue-next';
  import axios from 'axios';
  
  const options = ref([
    { 
      id: 1,
      name:'Usuário',
      src:'user',
      params:' '
    },
    {
      id:2,
      name:'Logout',
      src:'home',
      params:' '
    }
  ]);

  const cliente = ref({
    codigoCliente : "",
    cpfCliente: "",
    nomeCliente: "",
    emailCliente: "",
    celularCliente: "",
    createdAt: "",
  });

  const isLoged = ref(false);
  const userName = ref('Login');
  const brands = ['Apple', 'Xiaomi','Samsumg','Motorola','Asus'];
  const isModalOpen = ref(false);


  const storageIsLoged = window.localStorage.getItem('isUserLoged');
  const storageCliente = window.localStorage.getItem('cliente');


  if(storageIsLoged){
    cliente.value = JSON.parse(storageCliente );
    isLoged.value = JSON.parse(storageIsLoged);
    options.value.find(option => option.id ==1).params = cliente.value.codigoCliente;
    userName.value = cliente.value.nomeCliente.split(" ")[0];
  }

  watch(isLoged, (val)=>{
    if(val==true){
      window.localStorage.setItem('isUserLoged',JSON.stringify(val));
    }
  });

  
  const handleSuccesLogin = async (codigoCliente) =>{
      cliente.value = await loadClient(codigoCliente);
      isLoged.value = true;
      isModalOpen.value = false;
      userName.value = cliente.value.nomeCliente.split(' ')[0];
      window.localStorage.setItem('cliente',JSON.stringify(cliente.value));   
      options.value.find(option => option.id == 1).params = codigoCliente;
      
  }

  const loadClient = async (codigoCliente) =>{
        const url_login = 'http://localhost:3000/clientes/'+codigoCliente;
        const response_cliente={};
        await axios.get(url_login)
        .then(function(response){
            response_cliente.codigoCliente = response.data.result.codigoCliente;
            response_cliente.cpfCliente = response.data.result.cpfCliente;
            response_cliente.nomeCliente = response.data.result.nomeCliente;
            response_cliente.celularCliente = response.data.result.celularCliente;
            response_cliente.emailCliente = response.data.result.emailCliente;
            response_cliente.createdAt = response.data.result.createdAt;

        });
        return response_cliente;
    }

  const handlelLogOut = ()=>{
    isLoged.value=false;
    window.localStorage.removeItem('isUserLoged');
    window.localStorage.removeItem('cliente');
    cliente.value.codigoCliente = " ";
    userName.value = "Login";
  }


</script>



<style scoped>
a{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-decoration: none;
  color: #7F57F1;
  
}
.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:center;
  background-color: white;
  height: 60px;
}

.logodiv{
  font-weight: bold;
  flex-basis: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

p{
  margin-top: 1px;
  flex-basis: 100%;
  text-align: center;
}

.icondiv{
  display: flex;
  justify-content: flex-end;
  height: 45px;
  gap: 30px;
  width: 450px;
  font-size: 15px;
}
.usericon-div{
  width: 150px;
  z-index: 1000;
}
.userlink{
  width: 33px;
  height: 33px;
  
}

.favlink{
  width: 66px;
}
.cartlink{
  width: 48px;
}
.dropmenu-username{
  text-align: left;
  margin: 0px;
  color: #7F57F1;
}
.searchdiv{
  flex-basis: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.searchbar{
  flex-basis: 75%;
  border-radius: 20px 0px 0px 20px;
  padding: 5px 15px 5px 15px;
  border: 0.5px solid #E6E6E6;
  height: 25px;
  font-size: 18px;
}
.searchbtn{
  width: 120px;
  padding: 6px 20px 6px 10px;
  border-radius: 0px 20px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  background-color: #7F57F1;
  border:none ;
  font-size: 16px;
}
.brandsdiv{
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-basis: 100%;
  color: white;
  background-color: #7F57F1;
  font-size: 17px;
}
.brandspan{
  margin: 0px 13% 0px 13%;
  display: flex;
  flex-basis: 100%;
  justify-content: space-around;
  align-items: center;
  height: 34px;
}
span{
  height: 25px;
  display: flex;
  align-items: center;
  flex-basis: 10%;
  color: white;
}
.offers{
  display: flex;
  justify-content: space-evenly;
  background-color: black;
  color: white;
  font-size: 17px;
  font-weight: bold;
}
.searchbar:focus{
  outline: #7F57F1;
  border: 2px solid #7F57F1;
}
.searchbtn:hover{
  font-weight: bold;
}

.fa-user{
  flex-basis: 100%;
}
.userlink span{
  font-size: 20px;
  
}
nav a.router-link-exact-active {
  color: #7F57F1;
}

span:hover{
  font-size: 18px;
}
.offers:hover{
  font-size: 18px;
}

.login-card{
  display: inline-block;
}
</style>
