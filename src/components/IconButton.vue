<template>
    <button :disabled="!isEnabled" :class="[isEnabled? 'enabled-btn':'disabled-btn',
    isDark? 'dark-btn':'light-btn']">
        <slot name="icon">
        </slot>
    </button>
</template>

<script setup>
import { defineProps} from 'vue';
defineProps({
    isEnabled:{
        type : Boolean,
        default : false
    },
    isDark:{
        type:Boolean,
        default:true
    }
});

</script>

<style scoped>
button{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    height: 38px;
    width: 38px;
    border-style: none;
}

a{
text-decoration: none;
}

.dark-btn{
    background-color: rgb(var(--primary--500));
    color: white;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.18);
}

.dark-btn:hover{
    transition: all 0.3s ease-in-out;
    background-color: rgb(var(--primary--600));
}

.light-btn{
    color: #7F57F1;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;
    background: transparent;
    box-shadow: 0px 2px 2px rgba(0,0,0,0.18);
    &:hover{
        background:rgba(127, 87, 241, 0.2) ;
    }
}
.disabled-btn{
    opacity: 35%;
    transition: none;
    box-shadow: none;
}

</style>