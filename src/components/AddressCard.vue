<template>
    <div class="card">
        <div class="title">
            <h4>{{ address.nomeEndereco }}</h4>
            <div class="btns">
                <SquarePen class="edit-btn" @click="editAddress()"/>
                <CircleX class="close-btn" @click="removeAddress()"/>
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
    <BaseModal :showActionButton="true" :isModalOpen="isModalOpen" @close-modal="handleCloseModal()" @action-modal="handleEditAddress()">
            <template #header>

                <h4>Alterar Endereço</h4>
            </template>
            <template #main>
                <form class="addressform">
                    <BaseInput class="adress-name" :placeholder="'Nome do Endereço'" v-model="address.nomeEndereco"/>
                    <BaseInput class="zip " :placeholder="'CEP'" v-model="address.cep" :verifyBlur="true" @blur-event="checkCepCard"/>
                    <BaseInput class="street" :placeholder="'Rua'" v-model="address.nomeRua" />
                    <BaseInput class="number" :placeholder="'Numero'" v-model="address.numeroCasa" :isFieldSmall="true"/>
                    <BaseInput class="complement"  :placeholder="'Complemento'" v-model="address.complemento" :isFieldSmall="true"/>
                    <BaseInput class="city" :placeholder="'Cidade'" v-model="address.cidade"/>
                    <BaseInput class="state" :placeholder="'Estado'" v-model="address.estado" :isFieldSmall="true"/>
                </form>
            </template>
    </BaseModal>
</template>

<script setup>
    import BaseModal from '@/components/BaseModal.vue';
    import BaseInput from './BaseInput.vue';
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
    const emit = defineEmits(['remove-address']);

    const removeAddress = () =>{
            const url_delete  = 'http://localhost:3000/endereco/'+props.address.codigoEndereco;
            axios.delete(url_delete, {
                    
            })
            .then(function(response){
                    toast.success(response.data.message);
                    emit('remove-address',props.address.codigoEndereco);
            })
            .catch(function(error){
                    toast.error(error);
            });
    }
       
    const editAddress = () =>{
        isModalOpen.value = true;  
    }

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
    border: 1px solid #7F57F1;
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

h4{
    margin: 0px;
    color: #7F57F1;
}
</style>