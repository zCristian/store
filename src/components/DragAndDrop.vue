<template>
    <div class="dragdrop-wraper">
        <div class="dragdrop-header">
            <h2>IMAGENS</h2>
        </div>
        <div @dragenter.prevent="toggleActive"  @dragleave.prevent="toggleActive"  
        @dragover.prevent @drop.prevent="toggleActive" 
        :class="{'active-dropzone':isActive}" class="dropzone">
            <span>Arraste até 4 Imagens</span>
            <span>Ou</span>
            <label class="img-selector" for="dropzoneImage">Selecione</label>
            <input type="file" accept=".jpeg,.jpg,.png" id="dropzoneImage" class="dropzoneImage">  
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
const isActive = ref(false);

const toggleActive = () =>{
    isActive.value =  !isActive.value
}
</script>

<style scoped>
.dragdrop-wraper{
    display: flex;
    flex-direction: column;
    h2{
        font-size: 21px;
        font-weight: 500;
        color: rgb(var(--primary--black),0.85);
        margin: 0px;
    }
}

.dropzone{
    display: flex;
    height: 250px;
    flex-direction: column;
    margin-top: 24px;
    border: 2px dashed rgba(var(--primary--500),0.6);
    justify-content: center;
    align-items: center;
    padding: 15px;
    gap: 15px;
    input{
        display: none;
    }
}

.img-selector{
    border-radius: 8px;
    border:1px solid rgba(var(--primary--500),0.22);
    padding: 8px 16px;
    background-color: rgb(var(--primary--500));
    color: white;
    cursor: pointer;
    font-size: 20px;
    
    box-shadow: 0px 2px 3px 0px rgba(var(--primary--black),0.22);
    &:hover{
        background-color: rgb(var(--primary--600));
    }
}

.active-dropzone{
    background-color: rgb(var(--primary--300));
    color: white;
    transition: all ease-in-out 0.4s;
    label{
        transition: all ease-in-out 0.4s;
        background-color: white;
        color: rgb(var(--primary--500));
    }
}
</style>