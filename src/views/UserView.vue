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
                <input   class="name field" type="text" placeholder="Nome" v-model="cliente.nomeCliente" :disabled="!isEditUserOn">
                <input   class="phone field" type="text" placeholder="Celular" v-model="cliente.celularCliente" :disabled="!isEditUserOn">
                <input   class="email field" type="text" placeholder="E-mail" v-model="cliente.emailCliente" :disabled="!isEditUserOn">
                <ActionButton v-if="isEditUserOn" :btntext="btntext" @click="editUser()"/>
            </form>
        </div>
        <div class="address container">
            <div class="addressform-head">
                <h2>Cadastrar Endereço</h2>
            </div>
            
            <form class="addressform">
             <input   class="adress-name field" type="text" placeholder="Nome do Endereço" v-model="nomeEndereco">
             <input   class="zip field" type="text" placeholder="CEP" v-model="cep" @blur="checkCep">
             <input   class="street field" type="text" placeholder="Rua" v-model="nomeRua" >
             <input   class="number sm-field" type="text" placeholder="Numero" v-model="numeroCasa">
             <input   class="complement sm-field" type="text" placeholder="Complemento" v-model="complemento" >
             <input   class="neighborhood field" type="text" placeholder="Bairro" v-model="bairro" >
             <input   class="city field" type="text" placeholder="Cidade" v-model="cidade" >
             <input   class="state sm-field" type="text" placeholder="Estado" v-model="estado">

             <ActionButton :btntext="AddresBtnTXT" @click="addAddress"/>
            </form>
            
        </div>
        <div class="card-container container">
            <div class="cardcontainer-head">
                <h2>Endereços Cadastrados</h2>
            </div>
            <AddressCard  v-for="address in addresses" :key="address.codigoEndereco" :address="address" 
            @remove-address="handleRemoveAddress"/>
        </div>
        
    </div>

</template>

<script setup>
    import ActionButton from '@/components/ActionButton.vue';
    import AddressCard from '@/components/AddressCard.vue';
    import {ref, defineProps, onBeforeMount} from 'vue';
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
    const nomeEndereco =  ref('');
    const cep = ref('');
    const nomeRua = ref('');
    const numeroCasa = ref('');
    const complemento = ref('');
    const bairro = ref('');
    const cidade = ref('');
    const estado = ref('');

    onBeforeMount(() =>{
        loadClient();
        loadAddresses();
    });

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
                createAddressCard(retornos[i].nomeEndereco,retornos[i].cep, retornos[i].nomeRua,retornos[i].numeroCasa, retornos[i].complemento,
                retornos[i].bairro,retornos[i].cidade,retornos[i].estado,retornos[i].codigoEndereco);
            }
        })
        .catch(function(error){
            if(error.response){
                
                toast.error(error.response.data.error);
            }
        });
    }
    const checkCep =()=>{
        cep.value = cep.value.replace(/\D/g, '');
        
        if(cep.value!='' && cep.value.length == 8 ){
            fetch(`https://viacep.com.br/ws/${cep.value}/json/`).then(res =>res.json()).then(data=>{
                nomeRua.value = data.logradouro;
                complemento.value = data.complemento;
                bairro.value = data.bairro;
                cidade.value = data.localidade;
                estado.value = data.uf;
        
            });
        }
        
    }
    const addresses = ref([]);
    const addAddress = () =>{
        const url_address = 'http://localhost:3000/endereco';
        const response_msg = ref('');
        axios.post(url_address,{
            nomeEndereco : nomeEndereco.value,
            cep :cep.value,
            nomeRua : nomeRua.value,
            numeroCasa :numeroCasa.value,
            complemento: complemento.value,
            bairro :bairro.value,
            cidade : cidade.value,
            estado : estado.value,
            codigoCliente : props.codigoCliente,
        })
        .then(function(response){
            response_msg.value = response.data.message;
            toast.success(response_msg.value);
            createAddressCard(nomeEndereco.value,cep.value,nomeRua.value,numeroCasa.value,
            complemento.value,bairro.value,cidade.value,estado.value,response.data.codigoEndereco);
        })
        .catch(function(error){
        if(error.response){
            response_msg.value = error.response.data.error;
            toast.error(response_msg.value);
        }
        })

    }
    const createAddressCard = (nomeEndereco,cep,nomeRua,numeroCasa,complemento,bairro,
    cidade,estado,codigoEndereco)=>{
            addresses.value.push({
                nomeEndereco: nomeEndereco,
                cep:cep,
                nomeRua:nomeRua,
                numeroCasa:numeroCasa,
                complemento:complemento,
                bairro:bairro,
                cidade:cidade,
                estado:estado,
                codigoEndereco:codigoEndereco
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