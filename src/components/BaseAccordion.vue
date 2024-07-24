<template>
<div class="accordion-wraper">
    <div class="accordion-itens" v-for="category in categories" :key="category.codigoCategoria">
        <div @mouseover="handleCategoryHover(category.codigoCategoria)" @mouseleave="hoveredCategory=null" class="title-edit-div">
           <h3>{{ category.nomeCategoria}}</h3> 
            <SquarePen v-if="category.codigoCategoria===hoveredCategory" class="squarepen-icon" @click="editCategoryModal(category)"/> 
        </div>
        <ChevronDown class="chevron-icon"/>
    </div>
</div>
<div class="editcategory-modal">
    <BaseModal :btntext="'Editar'" :showActionButton="true" :isModalOpen="isModalOpen" 
    @close-modal="handleCloseModal" @action-modal="handleEditCategory">
        <template #header>
            <h4>Editar Categoria</h4>
            <hr>
            <span v-if="errorMessage" class="span-error">{{ responseText }}</span>
            <span v-if="succesMessage" class="span-succes">{{ responseText }}</span>
        </template>
        <template #main>
            <div class="edit-category">
                <BaseInput @keyup.enter="handleEditCategory" :label="'Nome da Categoria'" :placeholder="'Categoria'" v-model="updatedCategory.nomeCategoria"/>
            </div>
        </template>
        <template #foot>
            <BaseButton :isExclude="true" :btnsrc="'#'" :btntext="'Excluir'" @click="openDialog" />
            <BaseModal :is-modal-open="isDialogOpen" @close-modal="isDialogOpen=false">
                <template #header >
                    <span class="alert-header">Excluir Categoria</span>
                    <hr class="alert-hr">
                </template>
                <template #main>
                    <div class="alert-content">
                        <span>Tem certeza? Essa ação não pode ser desfeita</span>
                        <div class="option-wrap">
                            <BaseButton :is-small="true" :isExclude="true" :btntext="'Excluir'" @click=handleDeleteCategory />
                            <BaseButton :is-small="true" :btntext="'Cancelar'"  @click="isDialogOpen=false"/>
                        </div>
                    </div>
                </template>
            </BaseModal>
        </template>
    </BaseModal>
</div>
</template>
<script setup>
import {defineProps,ref} from 'vue';
import { ChevronDown,SquarePen } from 'lucide-vue-next';
import BaseModal from './BaseModal.vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import { useToast } from 'vue-toastification';
    
const toast = useToast();
const props = defineProps({
    categories :{
        type:[Array,Boolean],
        default: false
    }
})
const isModalOpen = ref(false);
const isDialogOpen = ref(false);
const succesMessage = ref(false);
const errorMessage = ref(false);
const responseText = ref('');
const updatedCategory = ref({
    codigoCategoria:'',
    nomeCategoria:''
})
const axios = require('axios').default;
const hoveredCategory = ref(null);

const handleCategoryHover = (category) => {
    hoveredCategory.value = category;
}

const editCategoryModal= (category)=>{
    isModalOpen.value = true;
    updatedCategory.value = category;
}
const handleEditCategory = ()=>{
    const url_editcaterogy = 'http://localhost:3000/categorias/'+updatedCategory.value.codigoCategoria;
    axios.put(url_editcaterogy,{
        nomeCategoria : updatedCategory.value.nomeCategoria
    }).then(function(response){
        succesMessage.value = true
        responseText.value = (response.data.message);
    }).catch(function(error){
        errorMessage.value = true;
        responseText.value = error.message;
    })
}
const handleCloseModal = ()=>{
    isModalOpen.value = false;
    errorMessage.value = false;
    succesMessage.value = false;
}
const openDialog = ()=>{
    isDialogOpen.value = true;
}

const handleDeleteCategory = ()=>{
    const url_deletecategory='http://localhost:3000/categorias/'+updatedCategory.value.codigoCategoria;
    axios.delete(url_deletecategory)
    .then(function(response){
        toast.success(response.data.message);
        isDialogOpen.value = false;
        handleCloseModal();
    })
    .catch(function(error){
        toast.error(error);
        isDialogOpen.value = false;
        handleCloseModal();
    });
}
console.log(props.categories);
</script>
<style scoped>

.accordion-wraper{
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3{
        color: rgb(var(--primary--500));
    }
}
.title-edit-div{
    display: flex;
    width: 60%;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    .squarepen-icon{
        color: rgb(var(--primary--500));
    }
}
.accordion-itens{
    border: 1px solid rgb(var(--primary--500));
    padding: 0px 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center
}
.accordion-itens:first-child{
    border-radius: 8px 8px 0px 0px;
}
.accordion-itens:last-child{
    border-radius: 0px 0px 8px 8px;
    box-shadow: 0px 4px 0px rgba(0,0,0,0.22);
}
.chevron-icon{
    width: 28px;
    height: 28px;
    color: rgb(var(--primary--500));
}
h4{
    margin: 0px;
}
hr{
    width: 100%;
    height: 0px;
    color: rgba(0,0,0,0.22);
}

.edit-category{
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 15px;
}
.span-error{
    font-size: 14px;
    color: rgba(232, 23, 58, 0.8);
}
.span-succes{
    font-size: 14px;
    color: rgba(13, 219, 44,0.9);
}
.alert-header{
        font-weight: 700;
}
.alert-content{
    font-size: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 360px;
    .option-wrap{
        display: flex;
        justify-content: space-between;
    }
}

</style>