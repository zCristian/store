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
      <router-link v-if="isLoged==false" id="userbtn" to="" class="userlink" @click="popCard()"><User/><p>{{ userName }}</p></router-link>
      <router-link v-if="isLoged" id="userbtn" :to="{name:'user', params: {codigoCliente:codigoCliente}}" class="userlink" ><User/><p>{{ userName }}</p></router-link>
      <router-link to="/favorites" class="favlink"><Heart/><p>Favoritos</p></router-link>
      <router-link to="/cart" class="cartlink"><ShoppingBag/><p>Itens</p></router-link>
     
    </div>
    <div class="brandsdiv">
      <div class="brandspan">
        <router-link v-for="brand in brands" :key="brand" to="/products"><span >{{brand}}</span></router-link>
        <span class="offers"><BadgePercent/>Ofertas</span>
      </div>
    </div>
  </nav>

  <router-view></router-view>
  <SignupLoginCard v-if="showCard"  :showCard="showCard" @closeCard="handleCloseCard"  class="login-card" 
  @succes_signup="handleSuccesSU" @succes_login="handleSuccesLogin"/>
  <PageFooter/>
</template>


<script setup>
  import SignupLoginCard from '../src/components/SignupLoginCard.vue'
  import PageFooter from '../src/components/PageFooter.vue'
  import { ShoppingBag,Heart,User,BadgePercent} from 'lucide-vue-next';
  import {ref} from 'vue';
  import { Search } from 'lucide-vue-next';
  
  const codigoCliente=ref('');

  const isLoged = ref(false);
  const userName = ref('Login');
  const brands = ['Apple', 'Xiaomi','Samsumg','Motorola','Asus'];
  const showCard = ref(false);
  const popCard = ()=>{
    showCard.value = true;
  }
  const handleCloseCard =()=>{
    showCard.value = false;
    
  }
  const handleSuccesSU =()=>{
    
  }
  const handleSuccesLogin = (cliente) =>{
      userName.value = cliente.value.nomeCliente;
      codigoCliente.value = cliente.value.codigoCliente;
      isLoged.value = true;
      localStorage.setItem('cliente', JSON.stringify(cliente.value));
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
  margin: 30px 0px 0px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:inherit;
  color:none;
  background-color: white;
}

.logodiv{
  margin: 0px 0px 15px 0px;
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
  margin: 0px 0px 15px 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 45px;
  gap: 30px;
  width: 220px;
  font-size: 15px;
}
.userlink{
  width: 41px;
}
.favlink{
  width: 66px;
}
.cartlink{
  width: 48px;
}
.searchdiv{
  flex-basis: 40%;
  margin-bottom: 15px;
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
  width: 1220px;
  height: 34px;
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
  height: 34px;
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
