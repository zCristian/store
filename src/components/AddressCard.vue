<template>
    <div class="card">
        <div class="title">
            <h4>Endereço {{ props.address.id }}</h4>
            <div class="btns">
                <SquarePen class="edit-btn" />
                <CircleX class="close-btn" @click="removeAddress(props.address.id)"/>
            </div>           
        </div> 
        <hr>
        <div class="head">
            <p>{{ props.address.cep }}</p>
        </div>
        <div class="main">
            <p>{{ props.address.nomeRua }} {{ props.address.numeroCasa }} - {{ props.address.estado }}</p>
            <p>{{ props.address.complemento }}</p>      
        </div>
    </div>
</template>

<script setup>

    import { CircleX,SquarePen } from 'lucide-vue-next';
    import { defineProps} from 'vue';

    const props = defineProps({
        address:{
                type: Array,
                required: true
        }
    })
    const removeAddress = () =>{
        
    }
</script>

<style scoped>
.card{
    background-color: #F1EFF8;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    margin: 0px;
    border-radius: 15px;
    height: 120px;
    h4{
        margin: 0px;
    }
    p{
        margin: 0px;
    }
}
.title{
    display: flex;
    justify-content: space-between;
    flex-basis: 100%;
    color: #7F57F1;
}
.btns{
    display: flex;
    gap: 10px;
}
.edit-btn{
    color: #7F57F1;
    border: none;
    cursor: pointer;
   
}
.close-btn{
    color: #7F57F1;
    border: none;
    cursor: pointer;
    
}
hr{
    width: 300px;
    height: 0px;
    border: 1px solid black;
    margin: 0px;
}
.head{
    width: 300px;
}

</style>