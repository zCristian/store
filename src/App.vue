<template>
  <nav class="navbar">
    <div class="tabsdiv">
      
      <router-link to="/"><img img="pagelogo" src="../src/assets/logo.svg" alt="logo"></router-link> 
      <input type="text" class="searchbar">
      <router-link to="/categories">Categorias</router-link>
      <router-link to="/sales">Ofertas</router-link>
    </div>
    <div class="icondiv">
      <router-link to="/cart" class="cartlink"><i class="fa-solid fa-cart-shopping"></i></router-link>
      <router-link to="/user" class="userlink"><i class="fa-solid fa-user"></i><span>Olá {{ userName }} </span></router-link>
    </div>
    
  </nav>

  <router-view></router-view>
  
</template>


<script setup>
  import {ref} from 'vue';
  const userName = ref('Cristian');
</script>



<style>
#app {
  width: 100%;
  font-family: "Montserrat", sans-serif;
  text-align: center;
  text-align: center;
 
 
}
a{
  text-decoration: none;
  color: #7F57F1;
  
}
.navbar {
  padding: 15px 30px 15px 30px;
  grid-column-start: 1;
  grid-column-end:7 ;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items:center;
  color:none;
  background-color: white;
}

.tabsdiv{
  font-weight: bold;
  flex-basis: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.icondiv{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 15%;
}

.searchbar{
  width: 40%;
  border-radius: 20px 0px 0px 20px;
  padding: 5px 15px 5px 15px;
  border: 0.5px solid #E6E6E6;
  height: 25px;
}
.searchbar:focus{
  outline: #7F57F1;
  border: 2px solid #7F57F1;
}
.userlink{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
</style>
