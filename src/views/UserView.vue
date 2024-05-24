<template>
    <div class="head">  
    </div>
    <div class="main">
        <div class="client container">
            <div class="clientform-head">
                <h2>Usuário</h2>
                <SquarePen class="edit-btn" @click="editUserSwitch()"/>
            </div>
        
            <form class="clientform">
                <BaseInput class="name" :placeholder="'Nome'" v-model="cliente.nomeCliente" :isDisabled="!isEditUserOn"/>
                <BaseInput class="phone" :placeholder="'Celular'" v-model="cliente.celularCliente" :isDisabled="!isEditUserOn"/>
                <BaseInput class="email"  :placeholder="'E-mail'" v-model="cliente.emailCliente" :isDisabled="!isEditUserOn"/>
    
                <ActionButton v-if="isEditUserOn" :btntext="btntext" @click="editUser()"/>
            </form>
        </div>
        <div class="address container">
            <div class="addressform-head">
                <h2>Cadastrar Endereço</h2>
            </div>
            
            <form class="addressform">
             <BaseInput class="address-name" :placeholder="'Nome do Endereço'" v-model="address.nomeEndereco"/>
             <BaseInput class="zip" :placeholder="'CEP'"  v-model="address.cep" :verify-blur="true" @blur-event="handleBlur"/>
             <BaseInput class="street" :placeholder="'Rua'" v-model="address.nomeRua"/>
             <BaseInput class="number " :placeholder="'Numero'" v-model="address.numeroCasa" :isFieldSmall="true"/>
             <BaseInput class="complement " :placeholder="'Complemento'" v-model="address.complemento" :isFieldSmall="true"/>
             <BaseInput class="neighborhood"  :placeholder="'Bairro'" v-model="address.bairro"/>
             <BaseInput class="city" :placeholder="'Cidade'" v-model="address.cidade"/>
             <BaseInput class="state" :placeholder="'Estado'" v-model="address.estado" :isFieldSmall="true"/>
             <ActionButton :btntext="AddresBtnTXT" @click="addAddress"/>
            </form>
            
        </div>
        <div class="card-container container">
            <div class="cardcontainer-head">
                <h2>Endereços Cadastrados</h2>
            </div>
            <AddressCard  v-for="addr in addresses" :key="addr.codigoEndereco" :address="addr" 
            @remove-address="handleRemoveAddress"/>
        </div>
        
    </div>

</template>

<script setup>
    import ActionButton from '@/components/ActionButton.vue';
    import AddressCard from '@/components/AddressCard.vue';
    import BaseInput from '@/components/BaseInput.vue';
    import {ref, defineProps, onBeforeMount} from 'vue';
    //import useVuelidate from '@vuelidate/core';
    //import {required} from '@vuelidate/validators';
    import { useToast } from 'vue-toastification';
    import { SquarePen } from 'lucide-vue-next';


    const toast = useToast();
    const axios = require('axios').default;
    const btntext = ref('Alterar Informações');
    const AddresBtnTXT = ref('Adicionar Novo Endereço');
    const isEditUserOn = ref(false);
    const props = defineProps({
        codigoCliente: {
            type : String,
            required : false
        }
    });
    const cliente = ref({
    });

    const addresses = ref([]);
    const address = ref({
        nomeEndereco:'',
        cep:'',
        nomeRua:'',
        numeroCasa:'',
        complemento:'',
        bairro:'',
        cidade:'',
        estado:'',
        codigoEndereco:''
    });



    onBeforeMount(() =>{
        loadClient();
        loadAddresses();
    });
    const handleBlur = ()=>{
        checkCep();
    }
    const loadClient = () =>{
        const url_login = 'http://localhost:3000/cliente/'+props.codigoCliente;
        axios.get(url_login)
        .then(function(response){
            cliente.value = response.data.result;
        
        });
    }
    const loadAddresses = () =>{
        const url_endereco = 'http://localhost:3000/enderecos/'+props.codigoCliente;
        axios.get(url_endereco)
        .then(function(response){
            const retornos = response.data.result;
            for(let i=0;i<retornos.length;i++){

                const obj = {
                    nomeEndereco:retornos[i].nomeEndereco,
                    cep:retornos[i].cep,
                    nomeRua:retornos[i].nomeRua,
                    numeroCasa:retornos[i].numeroCasa,
                    complemento:retornos[i].complemento,
                    bairro:retornos[i].bairro,
                    cidade:retornos[i].cidade,
                    estado:retornos[i].estado,
                    codigoEndereco:retornos[i].codigoEndereco
                }
                createAddressCard(obj);
            }
        })
        .catch(function(error){
            if(error.response){
                
                toast.error(error.response.data.error);
            }
        });
    }
    const checkCep =()=>{
        address.value.cep = address.value.cep.replace(/\D/, '');
        if(address.value.cep!='' && address.value.cep.length == 8 ){
            fetch(`https://viacep.com.br/ws/${address.value.cep}/json/`).then(res =>res.json()).then(data=>{
                address.value.nomeRua = data.logradouro;
                address.value.complemento = data.complemento;
                address.value.bairro = data.bairro;
                address.value.cidade = data.localidade;
                address.value.estado = data.uf;
        
            });
        }
        
    }
    
    const addAddress = () =>{
        const url_address = 'http://localhost:3000/endereco';
        const response_msg = ref('');
        axios.post(url_address,{
            nomeEndereco : address.value.nomeEndereco,
            cep :address.value.cep,
            nomeRua : address.value.nomeRua,
            numeroCasa :address.value.numeroCasa,
            complemento: address.value.complemento,
            bairro : address.value.bairro,
            cidade : address.value.cidade,
            estado : address.value.estado,
            codigoCliente : props.codigoCliente,
        })
        .then(function(response){
            address.value.codigoEndereco = response.data.codigoEndereco;
            response_msg.value = response.data.message;
            toast.success(response_msg.value);
            createAddressCard(address.value);
        })
        .catch(function(error){
        if(error.response){
            response_msg.value = error.response.data.error;
            toast.error(response_msg.value);
        }
        })

    }
    const createAddressCard = (address)=>{
            addresses.value.push({
                nomeEndereco: address.nomeEndereco,
                cep:address.cep,
                nomeRua:address.nomeRua,
                numeroCasa:address.numeroCasa,
                complemento:address.complemento,
                bairro:address.bairro,
                cidade:address.cidade,
                estado:address.estado,
                codigoEndereco:address.codigoEndereco
            });
    }
    
    const handleRemoveAddress = (codigoEndereco)=>{
        for(let i=0;i<addresses.value.length;i++){
            if(addresses.value[i].codigoEndereco === codigoEndereco){
                addresses.value.splice(i,1);
            }
        }
    }
    const editUserSwitch= () =>{
        isEditUserOn.value = !isEditUserOn.value;
    }

    const editUser = () =>{
       const url_editaddress  = 'http://localhost:3000/cliente/'+cliente.value.codigoCliente;
       axios.put(url_editaddress, {
            nomeCliente : cliente.value.nomeCliente,
            cpfCliente : cliente.value.cpfCliente,
            celularCliente : cliente.value.celularCliente,
            emailCliente : cliente.value.emailCliente
       })
       .then(function(response){
            toast.success(response.data.message);
            isEditUserOn.value = false;
       })
       .catch(function(error){
            toast.error(error);
       });
    }

</script>

<style scoped>
    .head{
        margin-top: 80px;
        display: flex;
        justify-content: center;
    }
    .main{
        display: flex;
        justify-content: space-around;
        align-items: flex-start;

    }
    .clientform-head,.addressform-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        h2{
            margin: 0px;
        }
    }
    .cardcontainer-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
        h2{
            margin: 0px;
        }
    }
    .edit-btn{
            color: #7F57F1;
            border: none;
            cursor: pointer;
   
    }
    .clientform{
        margin: 10px 0px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 15px;
    }
    .addressform{
        margin: 10px 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 350px;
        gap: 15px;
    }
    .card-container{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    h2{
        color: #7F57F1;
    }
    h4{
        color: #7F57F1;
        margin: 0px; 
    }

    .cardlist-enter-active,
    .cardlist-leave-active{
        transition: all 0.5s ease;
    }
</style>