<template>
    <div class="head">  
    </div>
    <div class="manager-div">
            <BaseButton :btnsrc="'manager'" :btntext="'Manager'" class="manager-btn" />
    </div>
    <div class="main">
        <div class="client container">
            <div class="clientform-head">
                <h2>Usuário</h2>
                <SquarePen class="edit-btn" @click="editUserSwitch()"/>
            </div>
        
            <form class="clientform">
                <div class="name-wrapper inputdiv">
                    <BaseInput class="name" :placeholder="'Nome'" v-model="cliente.nomeCliente" :isDisabled="!isEditUserOn"/>
                    <span class="input-gap" v-if="!v$_user.nomeCliente.$error"></span>
             <span class="field-error" v-for="error in v$_user.nomeCliente.$errors" :key="error.$uid">{{ error.$message }}</span>
                </div>
                <div class="phone-wrapper inputdiv">
                    <CellInput class="phone" v-model="cliente.celularCliente" :isDisabled="!isEditUserOn"/>
                    <span class="input-gap" v-if="!v$_user.celularCliente.$error"></span>
                    <span class="field-error" v-for="error in v$_user.celularCliente.$errors" :key="error.$uid">{{ error.$message }}</span>
                </div>
                <div class="email-wrapper inputdiv">
                    <BaseInput class="email"  :placeholder="'E-mail'" v-model="cliente.emailCliente" :isDisabled="!isEditUserOn"/>
                    <span class="input-gap" v-if="!v$_user.emailCliente.$error"></span>
                    <span class="field-error" v-for="error in v$_user.emailCliente.$errors" :key="error.$uid">{{ error.$message }}</span>
                </div>
                <ActionButton v-if="isEditUserOn" :btntext="btntext" @click="submitUserForm()"/>
            </form>
        </div>
        <div class="address container">
            <div class="addressform-head">
                <h2>Cadastrar Endereço</h2>
            </div>
            
            <form class="addressform">
            
            <div class="address-name-wrapper inputdiv">
             <BaseInput class="address-name" :placeholder="'Nome do Endereço'" v-model="address.nomeEndereco" :verify-blur="true" />
             <span class="input-gap" v-if="!v$_address.nomeEndereco.$error"></span>
             <span class="field-error" v-for="error in v$_address.nomeEndereco.$errors" :key="error.$uid">{{ error.$message }}</span>
            </div>

            <div class="zip-wrapper inputdiv">
             <BaseInput class="zip" :placeholder="'CEP'"  v-model="address.cep" :verify-blur="true" @blur-event="handleBlur"/>
             <span class="input-gap" v-if="!v$_address.cep.$error"></span>
             <span class="field-error" v-for="error in v$_address.cep.$errors" :key="error.$uid">{{ error.$message }}</span>
            </div>

            <div class="street-wrapper inputdiv">
             <BaseInput class="street" :placeholder="'Rua'" v-model="address.nomeRua"/>
             <span class="input-gap" v-if="!v$_address.nomeRua.$error"></span>
             <span class="field-error" v-for="error in v$_address.nomeRua.$errors" :key="error.$uid">{{ error.$message }}</span>
            </div>

            <div class="sm-fields-wrapper">
                <BaseInput class="number " :placeholder="'Numero'" v-model="address.numeroCasa" :isFieldSmall="true"/>
                <BaseInput class="complement " :placeholder="'Complemento'" v-model="address.complemento" :isFieldSmall="true"/>
             
                <span class="input-gap" v-if="!v$_address.numeroCasa.$error"></span>
                <span class="field-error" v-for="error in v$_address.numeroCasa.$errors" :key="error.$uid">{{ error.$message }}</span>
            </div>
             

            <div class="neighbourhood-wrapper inputdiv">
             <BaseInput class="neighborhood"  :placeholder="'Bairro'" v-model="address.bairro"/>
             <span class="input-gap" v-if="!v$_address.bairro.$error"></span>
             <span class="field-error" v-for="error in v$_address.bairro.$errors" :key="error.$uid">{{ error.$message }}</span>
            </div>

            <div class="city-wrapper inputdiv">
             <BaseInput class="city" :placeholder="'Cidade'" v-model="address.cidade" :isDisabled="true"/>
             <span class="input-gap" v-if="!v$_address.cidade.$error"></span>
             <span class="field-error" v-for="error in v$_address.cidade.$errors" :key="error.$uid">{{ error.$message }}</span>
            </div>

            <div class="state-wrapper inputdiv">
             <BaseInput class="state" :placeholder="'Estado'" v-model="address.estado" :isFieldSmall="true" :isDisabled="true"/>
             <span class="input-gap" v-if="!v$_address.estado.$error"></span>
             <span class="field-error" v-for="error in v$_address.estado.$errors" :key="error.$uid">{{error.$message }}</span>
            </div>
             <ActionButton :btntext="AddresBtnTXT" @click.prevent="submitAddressForm"  />
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
    import BaseButton from '@/components/BaseButton.vue';
    import AddressCard from '@/components/AddressCard.vue';
    import BaseInput from '@/components/BaseInput.vue';
    import CellInput from '@/components/CellInput.vue';
    import {ref, defineProps, onBeforeMount} from 'vue';
    import useVuelidate from '@vuelidate/core';
    import {required, minLength,helpers,maxLength,email} from '@vuelidate/validators';
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
    
    const cliente = ref({});

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

    //Address Form Validation
    const required_msg = 'Esse campo deve ser preenchido';
    const cepLength_msg = 'O CEP deve ter 8 dígitos';
    const textLength_msg = '*';
    const address_rules = {
        nomeEndereco: {
            required:helpers.withMessage(required_msg, required),
            minLength:helpers.withMessage(textLength_msg,minLength(2))
        },
        cep: {
            required:helpers.withMessage(required_msg, required),
            minLength:helpers.withMessage(cepLength_msg,minLength(8)),
            maxLength: helpers.withMessage(cepLength_msg,maxLength(8))
        },
        nomeRua: {required:helpers.withMessage(required_msg, required)},
        numeroCasa: {required:helpers.withMessage(required_msg, required)},
        bairro:{required:helpers.withMessage(required_msg, required)},
        cidade:{required:helpers.withMessage(required_msg, required)},
        estado:{required:helpers.withMessage(required_msg, required)},
    }

    const v$_address = useVuelidate(address_rules,address);
    const validateAddressForm = async () => {
        await v$_address.value.$validate();
    }
    const submitAddressForm = async ()=>{
        const result =await v$_address.value.$validate();
        if(result){
            addAddress();
        } 
    }
    
    const userMinLength_msg = "O campo deve ter ao menos 5 caracteres";
    const isEmail_msg = "Insira um email válido";
    const isPhone_msg = "Insira um número de celular válido";
    
    // User Form Validation
    const user_rules = {
        nomeCliente : {
            required: helpers.withMessage(required_msg,required),
            minLength:helpers.withMessage(userMinLength_msg,minLength(5))
        },
        celularCliente: {
            required: helpers.withMessage(required_msg,required),
            minLength:helpers.withMessage(isPhone_msg,minLength(11)),
            maxLength:helpers.withMessage(isPhone_msg,maxLength(11))
        },
        emailCliente: {
            required: helpers.withMessage(required_msg,required),
            minLength:helpers.withMessage(userMinLength_msg,minLength(5)),
            email: helpers.withMessage(isEmail_msg,email)
        },
    }

    const v$_user = useVuelidate(user_rules,cliente);

    const submitUserForm = async () => {
        const result =await v$_user.value.$validate();
        if(result){
            editUser();
        }
    }

    onBeforeMount(() =>{
        loadClient();
        loadAddresses();
    });

    const handleBlur = ()=>{
        checkCep();
        validateAddressForm();
    }

    const loadClient = () =>{
        const url_login = 'http://localhost:3000/clientes/'+props.codigoCliente;
        axios.get(url_login)
        .then(function(response){
            cliente.value = response.data.result;
        
        });
    }

    const loadAddresses = () =>{
        const url_endereco = 'http://localhost:3000/clientes/'+props.codigoCliente+'/enderecos/';
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
                console.log("Cliente sem endereço");
            }
        });
    }

    const checkCep =()=>{
        address.value.cep = address.value.cep.replace(/\D/, '');
        if(address.value.cep!='' && address.value.cep.length == 8 ){
            fetch(`https://viacep.com.br/ws/${address.value.cep}/json/`).then(res =>res.json()).then(data=>{
                if(data.erro){
                    toast.error('CEP inválido');
                }else{
                    address.value.nomeRua = data.logradouro;
                    address.value.complemento = data.complemento;
                    address.value.bairro = data.bairro;
                    address.value.cidade = data.localidade;
                    address.value.estado = data.uf;
                }
                
        
            })
        }
        
    }
    
    const addAddress = () =>{
        const url_address = 'http://localhost:3000/clientes/'+props.codigoCliente+'/enderecos/';
        const response_msg = ref('');
        axios.post(url_address,{
            nomeEndereco : address.value.nomeEndereco,
            cep : address.value.cep,
            nomeRua : address.value.nomeRua,
            numeroCasa : address.value.numeroCasa,
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
       const url_editaddress  = 'http://localhost:3000/clientes/'+cliente.value.codigoCliente;
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
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }
    .manager-div{
        display: flex;
        justify-content: flex-start;
        margin-left: -20px;
        margin-bottom: 20px;
    }
    .manager-btn{
        margin-left: 87px;
        width: 100px;
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
        width: 320px;
    }
    .addressform{
        margin: 10px 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 320px;
      
    }
    .sm-fields-wrapper{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-basis: 100%;
    }
    .input-wrap{
        display: flex;
    }
    .input-gap{
        height: 25px;
        width: 300px;
        display: inline-block;
    }
    .field-error{
        margin-bottom:5px;
        padding-left: 7px;
        height: 20px;
        font-size: 13px;
        color: red;
        display: inline-block;
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