<template>
    <Teleport to="#modal" >
        <Transition name="modal">
            <div class="modal-bg" v-if="isModalOpen">
                <div class="modal">
                    <div class="head">
                            <CircleX @click="closeModal()" class="close-btn"></CircleX>
                    
                    </div>
                    <header class="title">
                        <slot name="header"></slot>
                    </header>
                    <main>
                        <slot name="main"></slot>
                    </main>
                    
                    <ActionButton v-if="props.showActionButton" :btntext="btntext" @click="actionModal()" @keyup.enter="actionModal"/>
                </div>
            </div>
        </Transition>
    </Teleport>

</template>

<script setup>
    import {defineProps,defineEmits} from 'vue';
    import ActionButton from'./ActionButton.vue'; 
    import { CircleX} from 'lucide-vue-next';
    const btntext = "Editar";
    const emit = defineEmits(['close-modal','action-modal'])
    const props = defineProps({
        isModalOpen : {
            Type:Boolean,
            required:true
        },
        showActionButton : {
            Type:Boolean,
            required:false
        }
    });
    console.log(props.isModalOpen);

    const closeModal = ()=>{
        emit('close-modal');
    }
    const actionModal = () =>{
        emit('action-modal');
    }
</script>

<style scoped>
.modal-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    background-color: #F1EFF8;
    padding: 15px 20px;
    border-radius: 20px;
    box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.modal-enter-active,
.modal-leave-active{
    transition: all 0.25s ease;
}
.head{
    display: flex;
    justify-content:flex-end;
    width: 318px;
}
.modal-enter-from,
.modal-leave-to{
    opacity: 0;
    transform: scale(1.1);
}
.close-btn{
    color: #7F57F1;
    border: none;
    cursor: pointer;    
}

</style>