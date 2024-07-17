<template>
    <button :disabled="!isEnabled">
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
    }
});

</script>

<style scoped>
button{
    color: white;
    border: none;
    border-radius: 2px;
    background-color: #7F57F1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
}

a{
text-decoration: none;
}
</style>