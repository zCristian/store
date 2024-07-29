<template>
     <div :class="[label ? 'input-wrap-wlabel': 'input-wrap']">
        <label v-if="label">{{ label }}</label>
        <input class="sm-field" type="text" 
        :value="modelValue" :placeholder="placeholder" :disabled="isDisabled"
        @input="handleInput" @blur="handleBlur">
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: [String, Boolean],
        default: false
    },
    placeholder: {
        type: [String],
        default: ""
    },
    modelValue: {
        type: [String,Number],
        required:true
    },
    verifyBlur: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isInt:{
        type:Boolean,
        default: false
    }
});

const emit = defineEmits(['blur-event', 'update:modelValue']);

const handleBlur = () => {
    if (props.verifyBlur) {
        emit('blur-event');
    }
};

const handleInput = (event) => {
    const inputValue = event.target.value;
    if(props.isInt){
        const intNumber = parseInt(inputValue);
        if (!isNaN(intNumber) || inputValue === '') {
        emit('update:modelValue', inputValue === '' ? '' : intNumber);
        } else {
            emit('update:modelValue', inputValue);
        }
    }else{
        const floatNumber = parseFloat(inputValue);
        if (!isNaN(floatNumber) || inputValue === '') {
        emit('update:modelValue', inputValue === '' ? '' : floatNumber);
        } else {
            emit('update:modelValue', inputValue);
        } 
    }
    
    
};
</script>

<style scoped>
.input-wrap-wlabel{
    display: flex;
    flex-direction: column;
    height: 55.2px;
}
.input-wrap{
    height: 42px;
}
input[type=number]{
    -moz-appearance: textfield;
    appearance: text;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.sm-field{
    width: 128px;
    height: 39px;
    font-size: 16px;
    border: 1px solid rgba(var(--primary--500), 0.5);
    border-radius: 8px;
    padding: 0px 10px;
    background-color: rgba(var(--primary--100), 0.3);
}

</style>