<template>
  <nav class="navbar">
    <div class="tabsdiv">
      
      <router-link to="/"><img img="pagelogo" src="../src/assets/logo.svg" alt="logo"></router-link> 
      <div class="searchdiv">
          <input type="text" class="searchbar">
          <button class="searchbtn"><Search/>Buscar</button>

      </div>
      
      <!--<router-link to="/categories">Categorias</router-link>
      <router-link to="/sales">Ofertas</router-link>-->
    </div>
    <div class="icondiv">
      <router-link to="/user" class="userlink"><User/><p>{{ userName }}</p></router-link>
      <router-link to="/fav" class="cartlink"><Heart/><p>Favoritos</p></router-link>
      <router-link to="/cart" class="cartlink"><ShoppingBag/><p>Itens</p></router-link>
     
    </div>
    <div class="brandsdiv">
      <div class="brandspan">
        <span>Apple</span>
        <span>Xiaomi</span>
        <span>Samsung</span>
        <span>Motorola</span>
        <span>Asus</span>
        <span class="offers"><BadgePercent/>Ofertas</span>
      </div>
    </div>
  </nav>

  <router-view></router-view>
  
</template>


<script setup>
  import { ShoppingBag,Heart,User,BadgePercent} from 'lucide-vue-next';
  import {ref} from 'vue';
  import { Search } from 'lucide-vue-next';
  const userName = ref('Cristian');
</script>



<style scoped>
#app {
  width: 100%;
  font-family: "Montserrat", sans-serif;
  text-align: center;
  text-align: center;
 
 
}
a{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-decoration: none;
  color: #7F57F1;
  
}
.navbar {
  margin: 15px 0px 0px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items:inherit;
  color:none;
  background-color: white;
}

.tabsdiv{
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 15px;
  font-weight: bold;
  flex-basis: 65%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
p{
  margin-top: 1px;
  flex-basis: 100%;
  text-align: center;
}
.icondiv{
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  flex-basis: 20%;
  font-size: 15px;
}
.searchdiv{
  width: 75%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.searchbar{
  width: 77%;
  border-radius: 20px 0px 0px 20px;
  padding: 5px 15px 5px 15px;
  border: 0.5px solid #E6E6E6;
  height: 25px;
  font-size: 18px;
}
.searchbtn{
  width: 20%;
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


</style>
