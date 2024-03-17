<template>
  <nav class="navbar">
    <div class="tabsdiv">
      <router-link to="/">Home</router-link> 
      <router-link to="/categories">Categorias</router-link>
      <router-link to="/sales">Ofertas</router-link>
    </div>
    <div class="icondiv">
      <router-link to="/cart" class="cartlink"><i class="fa-solid fa-cart-shopping"></i></router-link>
      <router-link to="/user" class="userlink"><i class="fa-solid fa-user"></i><span>Olá {{ userName }} </span></router-link>
    </div>
    
  </nav>
  <div class="horizontalline"></div>
  <router-view></router-view>
  
</template>


<script setup>
  import {ref} from 'vue';
  const userName = ref('Victor');
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
}
.navbar {
  padding: 15px 30px 15px 30px;
  grid-column-start: 1;
  grid-column-end:7 ;
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  align-items:center;
}

.tabsdiv{
  font-weight: bold;
  color: #2c3e50;
  flex-basis: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.icondiv{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 15%;
}
.horizontalline{
  width: 55%;
  border-top: 2px solid black;
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
  color: #42b983;
}
</style>
