<template>
    <div class="table-wrap">
        <table class="product-table" v-if="showTable" >
            <thead>
                <tr>
                    <th scope="col">PRODUTO</th>
                    <th scope="col">MARCA</th>
                    <th scope="col">PREÇO</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="product in products.slice(0,props.tableSize)" :key="product.codigoCategoria" 
                @mouseover="handleProductHover(product.codigoProduto)" @mouseleave="hoveredProduct=null">
                    <td>{{ product.nomeProduto}}</td>
                    <td>{{ product.marca}}</td>
                    <td>{{ product.valor }}</td>
                    <td v-if="hoveredProduct!==product.codigoProduto"><div class="space-holder"></div></td>
                    <td  v-if="hoveredProduct===product.codigoProduto">
                        <div class="table-icons">
                            <router-link :to="{path:`/editproduct/${product.codigoProduto}`}">
                                <CircleEllipsis class="edit-icon" :stroke-width="2.5"/>
                            </router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <li v-if="showEmpityMessage">Nenhum produto encontrado</li>
    </div>

</template>
<script setup>

import {ref,defineProps, onBeforeMount} from 'vue';
import {CircleEllipsis} from 'lucide-vue-next';
const props = defineProps({
    tableSize:{
        type:Number,
        required:true
    },
    codigoCategoria:{
        type:Array,
        required:true
    }
})

const products = ref([]);
const axios = require('axios').default;
const showEmpityMessage = ref(false);
const showTable = ref(false);
const hoveredProduct = ref(null)

onBeforeMount(()=>{
    loadItens(props.codigoCategoria[0]);
})
const loadItens = (codigoCategoria) =>{
    const loadproducts_url = 'http://localhost:3000/produtos?categorias='+codigoCategoria;
    axios.get(loadproducts_url)
    .then(function(response){
        showTable.value=true;
        products.value = response.data.result;
    }).catch(function(){
        showTable.value = false;
        showEmpityMessage.value=true;
    })
}

const handleProductHover=(product)=>{
    hoveredProduct.value = product;
}
</script>
<style scoped>
.table-wrap{
    width: 100%;
    margin-bottom: 10px; 
    li{
        list-style-type: none;
        margin-bottom: 10px; 
    }
    
}

.product-table{
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
    border-spacing: 0;
    th{
        color: rgba(var(--primary--black),0.85);
        text-align: left;
    }
    
    
}
.table-body tr:nth-child(odd) {
    background-color: rgba(var(--primary--200),0.4);
}

td{
    padding: 3px 2px;
}
.space-holder{
    width: 30px;
    height: 25px;
}
.edit-icon{
    color: rgb(var(--primary--500));
    cursor: pointer;
}
.table-icons{
    height: 25px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center; 
    a{
        height: 25px;
    }
}

.edit-icon:hover{
    color: rgb(var(--primary--700))
}
</style>