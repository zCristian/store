<template>
    <div class="card">
        <div class="title">
            <h4>{{ address.nomeEndereco }}</h4>
            <div class="btns">
                <SquarePen class="edit-btn" @click="editAddress()"/>
                <CircleX class="close-btn" @click="removeAddress(address.codigoEndereco)"/>
            </div>           
        </div> 
        <hr>
        <div class="head">
            <p>{{ address.cep }}</p>
        </div>
        <div class="main">
            <p>{{ address.nomeRua }} {{ address.numeroCasa }} - {{address.estado }}</p>
            <p>{{ address.complemento }}</p>      
        </div>
    </div>
    <BaseModal :isModalOpen="isModalOpen" @close-modal="handleCloseModal()" @action-modal="handleEditAddress()">
            <template #header>

                <h4>Alterar Endereço</h4>
            </template>
            <template #main>
                <form class="addressform">
                    <input   class="adress-name field" type="text" placeholder="Nome do Endereço" v-model="address.nomeEndereco">
                    <input   class="zip field" type="text" placeholder="CEP" v-model="address.cep" @blur="checkCepCard">
                    <input   class="street field" type="text" placeholder="Rua" v-model="address.nomeRua" >
                    <input   class="number sm-field" type="text" placeholder="Numero" v-model="address.numeroCasa">
                    <input   class="complement sm-field" type="text" placeholder="Complemento" v-model="address.complemento" >
                    <input   class="neighborhood field" type="text" placeholder="Bairro" v-model="address.bairro" >
                    <input   class="city field" type="text" placeholder="Cidade" v-model="address.cidade" >
                    <input   class="state sm-field" type="text" placeholder="Estado" v-model="address.estado">
                </form>
            </template>
    </BaseModal>
</template>

<script setup>
    import BaseModal from '@/components/BaseModal.vue';
    import { CircleX,SquarePen } from 'lucide-vue-next';
    import { ref,defineProps,defineEmits} from 'vue';
    import { useToast } from 'vue-toastification';
    const toast = useToast();
    const axios = require('axios').default;
    const isModalOpen = ref(false);
    const props = defineProps({
        address:{
                type: Object,
                required: true
        }
    })
    const emit = defineEmits(['remove-address']);
    const removeAddress = (codigoEndereco) =>{
       const url_delete  = 'http://localhost:3000/endereco/'+props.address.codigoEndereco;
       axios.delete(url_delete, {
            
       })
       .then(function(response){
            toast.success(response.data.message);
            emit('remove-address',codigoEndereco);
       })
       .catch(function(error){
            toast.error(error);
       });
    }

    const editAddress = () =>{
        isModalOpen.value = true;  
    }
    const address = ref({
        codigoEndereco : props.address.codigoEndereco,
        nomeEndereco : props.address.nomeEndereco,
        cep : props.address.cep,
        nomeRua : props.address.nomeRua,
        numeroCasa : props.address.numeroCasa,
        complemento : props.address.complemento,
        bairro : props.address.bairro,
        cidade : props.address.cidade,
        estado : props.address.estado
    });

    const handleCloseModal = ()=>{
        isModalOpen.value = false;
    }
    const checkCepCard =()=>{
        address.value.cep = address.value.cep.replace(/\D/g, '');
        if(address.value.cep!='' && address.value.cep.length == 8 ){
            fetch(`https://viacep.com.br/ws/${address.value.cep}/json/`).then(res =>res.json()).then(data=>{
                address.value.nomeRua = data.logradouro;
                address.value.complemento = data.complemento;
                address.value.bairro = data.bairro;
                address.value.cidade= data.localidade;
                address.value.estado= data.uf;
        
            });
        }
        
    }

    const handleEditAddress = () =>{
       const url_editaddress  = 'http://localhost:3000/endereco/'+props.address.codigoEndereco;
       axios.put(url_editaddress, {
            codigoEndereco : address.value.codigoEndereco,
            nomeEndereco : address.value.nomeEndereco,
            cep : address.value.cep,
            nomeRua : address.value.nomeRua,
            numeroCasa : address.value.numeroCasa,
            complemento : address.value.complemento,
            bairro : address.value.bairro,
            cidade : address.value.cidade,
            estado : address.value.estado
       })
       .then(function(response){
            toast.success(response.data.message);
            isModalOpen.value = false;
       })
       .catch(function(error){
            toast.error(error);
       });
    }
</script>

<style scoped>
.card{
    background-color: #F1EFF8;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    width: 320px;
    margin: 0px;
    border-radius: 15px;
    height: 120px;
    
    h4{
        margin: 0px;
    }
    p{
        font-size: 15px;
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
.addressform{
        margin: 10px 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 318px;
        gap: 15px;
}
.sm-field{
    width: 128px;
    height: 39px;
    font-size: 16px;
    border: 2px solid #7F57F1;
    border-radius: 10px;
    padding: 0px 10px;
    background-color: #F1EFF8;
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
h4{
    margin: 0px;
    color: #7F57F1;
}
</style>