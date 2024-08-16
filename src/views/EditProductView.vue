<template>
    <div class="view-content">
        <div class="edit-wraper">
            <div class="edit-header">
                <div>
                    <h1>Editar Produto</h1>
                </div>
                <div class="buttons-div">
                    <BaseSwitch :switch-value="product.isDisponivelCompra" 
                    @switch-event="toggleAvailability">
                        <template #switchtext>
                            <span>Ativar Anúncio</span>
                        </template>
                    </BaseSwitch>
                    <BaseButton :is-light="true" :is-small="true" :btntext="'Deletar'" @click="turnOffProduct">
                        <template #icon>
                            <Trash :size="22"/>
                        </template>
                    </BaseButton>
                    <BaseButton  :is-light="true" :is-small="true" :btntext="'Cancelar'" @click="isCancelModalOpen=true">
                       <template #icon>
                            <X class="cancel-icon" :size="25"/>
                       </template> 
                    </BaseButton>    
                    <BaseButton :is-small="true" :btntext="'Salvar'" @click="verifyChanges">
                        <template #icon>
                            <Check/>
                        </template>
                    </BaseButton>
                </div>
            </div>
            <hr>
            <div class="edit-tabs">
                <div v-for="tab in tabs" :key="tab.tabId" 
                :class="[(activeTab===tab.tabId)?'active-tab':'unactive-tab']"
                 @click="activeTab=tab.tabId">
                 <Circle v-if="activeTab!==tab.tabId" class="icon"/>
                 <img  v-if="activeTab===tab.tabId" src="../assets/icon/circle-inner.svg" class="icon">
                 <span>{{ tab.tabName }}</span>
                </div>
            </div>
            <hr>
            <div class="content">
                <div v-if="activeTab===0" class="images-wrap">
                    <DragAndDrop @drop.prevent="dropImage" @change="selectedImage"/>
                    <div class="image-info">
                        <span>Imagens Selecionadas: </span>
                        <span v-for="image in dropZoneImages" :key="image.name" >
                            {{ image.name}}; 
                        </span>
                    </div>
                    <BaseButton :is-small="true" btntext="Enviar" @click="createFormData()">
                        <template #icon><Upload :size="21" /></template>
                    </BaseButton>
                </div>
                <div v-if="activeTab===1" class="description-wrap">
                    <div class="description-header">
                        <h2>DESCRIÇÃO</h2>
                    </div>
                    <div class="product-description column">
                        <div>
                            <BaseInput :label="'Nome do Produto'" v-model="product.nomeProduto" :verify-blur="true" @blur-event="v$_product.nomeProduto.$touch"/>
                            <span class="error-span" v-for="error in v$_product.nomeProduto.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div>
                        <div>
                            <BaseInput :label="'Marca'" v-model="product.marca" :verify-blur="true" 
                            @blur-event="v$_product.marca.$touch"/>
                            <span class="error-span" v-for="error in v$_product.marca.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div>
                        <div>
                            <NumberInput :label="'Preço'" v-model="product.valor" class="price-input" 
                            :verify-blur="true" @blur-event="v$_product.valor.$touch"/>
                            <span class="error-span" v-for="error in v$_product.valor.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div>
                        <div class="textarea-wrap">
                            <label for="description"> Descrição</label>
                            <textarea  @blur="v$_product.descricaoProduto.$touch" name="description" rows="8" cols="30" v-model="product.descricaoProduto"></textarea>
                        </div>
                        <span class="error-span" v-for="error in v$_product.descricaoProduto.$errors" :key="error.$uid">{{error.$message }}</span>
                    </div>
                    <div class="product-specs column">
                        <div>
                            <NumberInput :label="'Altura'" v-model="product.alturaCM"
                            :verify-blur="true" @blur-event="v$_product.alturaCM.$touch"/>
                            <span class="error-span" v-for="error in v$_product.alturaCM.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div>
                        <div>
                            <NumberInput :label="'Largura'" v-model="product.larguraCM"
                            :verify-blur="true" @blur-event="v$_product.larguraCM.$touch"/>
                            <span class="error-span" v-for="error in v$_product.larguraCM.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div>  
                        <div>
                            <NumberInput :label="'Comprimento'"  v-model="product.comprimentoCM"
                            :verify-blur="true" @blur-event="v$_product.comprimentoCM.$touch"/>
                            <span class="error-span" v-for="error in v$_product.comprimentoCM.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div>
                        <div> 
                            <NumberInput :label="'Peso'"  v-model="product.pesoGramas"
                            :verify-blur="true" @blur-event="v$_product.pesoGramas.$touch"/>
                            <span class="error-span" v-for="error in v$_product.pesoGramas.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div> 
                        <div>
                            <NumberInput :is-int="true" :label="'Estoque Inicial'" v-model="product.quantidadeEstoque"
                            :verify-blur="true" @blur-event="v$_product.quantidadeEstoque.$touch"/>
                            <span class="error-span" v-for="error in v$_product.quantidadeEstoque.$errors" :key="error.$uid">{{error.$message }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="activeTab===2" class="categories-wrap">
                    <div class="categories-header">
                        <h2>CATEGORIAS</h2>
                    </div>
                    <CategoryFilter :product-categories="product.categorias"  @select-category="handleSelectCategory"
                     @unselect-category="handleUnselectCategory"/>
                </div>
                <div class="cardPreview">
                    <div class="cardpreview-header">
                        <Eye></Eye>
                        <h2>PRÉVIA DO CARD</h2>
                    </div>
                    <div class="cardpreview-content">
                        <BaseCard :product="product"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <BaseModal :is-modal-open="isCancelModalOpen"  @close-modal="isCancelModalOpen=false">
        <template #header>
            <h2>Cancelar Alterações </h2>
            <hr>
        </template>
        <template #main>As alterações não serão salvas</template> 
        <template #foot>
            <div class="modal-buttons">
                <BaseButton :is-exclude="true" :btntext="'Cancelar'" :is-small="true" :btnsrc="'/manager'"/>
                <BaseButton :btntext="'Voltar'" :is-small="true" @click="isCancelModalOpen=false"></BaseButton>  
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
import {useRoute} from 'vue-router';
import {onBeforeMount,ref} from 'vue';
import { Check,X,Trash,Circle,Upload,Eye} from 'lucide-vue-next';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import DragAndDrop from '@/components/DragAndDrop.vue';
import BaseSwitch from '@/components/BaseSwitch.vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseCard from '@/components/BaseCard.vue';
import useVuelidate from '@vuelidate/core';
import {required,helpers,decimal,integer} from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
const route = useRoute();
const toast = useToast();
const tabs = [{tabId:0, tabName:'Fotos'},{tabId:1, tabName:'Descrição'},{tabId:2, tabName:'Categorias'}];
const activeTab = ref(0);
const axios = require('axios').default;
const isCancelModalOpen = ref(false);
//const isDeleteModalOpen = ref(false);
const dropZoneImages = ref([]);
const product = ref({});

//Validação das infos do produto
const required_msg = 'O campo deve ser preenchido';
const decimal_msg = 'Apenas valores decimais';
const integer_msg = 'Apenas valores inteiros';

const product_rules = {
        valor:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)     
        },
        nomeProduto:{
            required: helpers.withMessage(required_msg,required)
        },
        marca:{
            required: helpers.withMessage(required_msg,required)
        },
        descricaoProduto:{
            required: helpers.withMessage(required_msg,required)
        },
        pesoGramas:{
            required: helpers.withMessage(required_msg,required)
        },
        alturaCM:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)
        },
        larguraCM:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)
        },
        comprimentoCM:{
            decimal: helpers.withMessage(decimal_msg,decimal),
            required: helpers.withMessage(required_msg,required)
        },
        quantidadeEstoque:{
            integeer: helpers.withMessage(integer_msg,integer),
            required: helpers.withMessage(required_msg,required)
        } 
}
const v$_product = useVuelidate(product_rules,product);

//Carregar o Produto na view
onBeforeMount(()=>{
    loadProduct(route.params.productid)
})

const loadProduct =(codigoProduto)=>{
    const loadproduct_url = 'http://localhost:3000/produtos/'+codigoProduto;
    axios.get(loadproduct_url).then(function(response){
        product.value = response.data.result
    }).catch(function(error){
        console.log(error);
    })
}

//Seletor de Imagens
const dropImage = (e) =>{
    dropZoneImages.value.push(e.dataTransfer.files[0]);
}

const selectedImage = ()=>{
    const  inputFile = document.querySelector('.dropzoneImage');
    console.log(inputFile.value);
    if(inputFile && inputFile.files.length>0){
        dropZoneImages.value.push(inputFile.files[0]);
    }
}

const createFormData = () =>{
    const formData = new FormData();
    dropZoneImages.value.forEach((image,index)=>{
        formData.append(`foto-${index+1}`, image);
    });
    uploadImages(formData);
}

const uploadImages = (formData) =>{
    const uploadimages_url = 'http://localhost:3000/produtos/'+product.value.codigoProduto+'/upload';
    console.log(formData);
    axios.post(uploadimages_url,formData,{
        headers:{
            "Content-Type": 'multipart/form-data'
        }
    }).then(function(response){
        console.log(response.data.message);
    });
}

//Filtro de Categorias
const handleSelectCategory = (category)=>{
    product.value.categorias.push(category);
}
const handleUnselectCategory = (category)=>{
    product.value.categorias.pop(category);
}

//Remover Anuncio / Alterar Disponibiliadade
const turnOffProduct = ()=>{
    const changevisibility_url = 'http://localhost:3000/produtos/'+product.value.codigoProduto+'/visibilidade';
    axios.patch(changevisibility_url,{
        isVisible : false
    }).then(function(response){
        console.log(response.data.message);
    })
}

const toggleAvailability = (isDisponivelCompra)=>{
    product.value.isDisponivelCompra = !isDisponivelCompra;
}
const handleChangeAvailability = ()=>{
    const changeavailability_url = 'http://localhost:3000/produtos/'+product.value.codigoProduto+'/disponibilidade/';
    axios.patch(changeavailability_url,{
        isDisponivelCompra : product.value.isDisponivelCompra
    }).then(function(response){
        console.log(response.data.message);
    })
}
//Validar e Salvar Alterações

const verifyChanges = async ()=>{
    const result =await v$_product.value.$validate();
    console.log(result);
    if(result){
        editProduct();
    }else{
        activeTab.value=1;
    }
}

const editProduct = () =>{
    const editproduct_url = 'http://localhost:3000/produtos/'+product.value.codigoProduto;
    axios.put(editproduct_url,{
        valor:product.value.valor,
        nomeProduto : product.value.nomeProduto,
        marca : product.value.marca,
        descricaoProduto : product.value.descricaoProduto,
        pesoGramas :product.value.pesoGramas,
        alturaCM:product.value.alturaCM,
        larguraCM:product.value.larguraCM,
        comprimentoCM:product.value.comprimentoCM,
        categorias:product.value.categorias,
    }).then(function(response){
        handleChangeAvailability();
        toast.success(response.data.message);
    }).catch(function(error){
        toast.error(error.message);
    });
}
</script>


<style scoped>
.view-content{
    background-color: #F7F7F7;
    display: flex;
    justify-content: center;
}
h2{
        font-size: 21px;
        font-weight: 500;
        color: rgb(var(--primary--black),0.85);
        margin: 0px;
}
.error-span{
    font-size: 12px;
    color: rgba(var(--primary--red),0.8);
    margin: 0px;
}
.edit-wraper{
    width: 1220px;
    margin-top: 60px;
    height: 775px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 3px 3px 0 rgba(0,0,0,0.22);
}
hr{
    background-color: rgb(var(--primary--500),0.22);
    margin: 0px;
    height: 1px;
    border: 0px;
}

.edit-header{
    display: flex;
    height: 84px;
    justify-content: space-between;
    align-items: center;
    padding: 0px 60px;
    h1{
        font-size: 24px;
        font-weight: 600;
        color: rgb(var(--primary--black));
        margin: 0px;
    }
}

.buttons-div{
    display: flex;
    justify-content: space-around;
    gap: 24px;
    .cancel-icon{
        font-size: 25px;
    }
}

.edit-tabs{
    height: 74px;
    padding: 0px 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
    div{
        display: flex;
        justify-content: center;
        gap: 5px;
        font-size: 16px;
        align-items: center;
        width: 140px;
        height: 40px;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.22);
    }
}
.active-tab{
    width: 140px;
    border: 2px solid rgb(var(--primary--500));
}
.unactive-tab{
    border: 1px solid rgba(var(--primary--500),0.25);
}
.icon{
    width: 16px;
    height: 16px;
    color: rgb(var(--primary--500));
}

.content{
    display: grid;
    border-radius: 8px;
    grid-template-columns: [first] 740px [second] auto;
    grid-template-rows: 610px;
}
.categories-wrap{
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    padding: 30px 60px;
}
.images-wrap{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 30px 60px;
}
.description-wrap{
    display: grid;
    grid-template-columns: [first] 60px [second] 321px [third] auto [fourth] 200px [fifht] 60px ;
    grid-template-rows: [first] 30px [second] 45px[third] 436px;
}
.description-header{
    grid-row-start: second;
    grid-column-start: second;
}

.column{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
}
.product-description{
    grid-row-start: third;
    grid-column-start: second;
    
}
.textarea-wrap{
    display: flex;
    flex-direction: column;
    font-family: 'Montserrat';
    textarea{
            width: 296px;
            border: 1px solid rgba(var(--primary--500), 0.5);
            height: 140px;
            border-radius: 8px;
            resize: none;
            padding: 8px 10px;
            font-size: 16px;
            background-color: rgba(var(--primary--100),0.3);
    }
}

.product-specs{
    grid-column-start: fourth;
    grid-row-start: third;
}

.cardPreview{
    display: flex;
    padding: 30px 60px 0px 30px;
    border-bottom-right-radius: 8px;
    border-left: 1px solid rgba(var(--primary--500),0.22);
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: rgb(var(--primary--white));
}

.cardpreview-header{
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.modal-buttons{
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    gap: 10px;
}
</style>