<template>
    <div class="input-wrap">
        <input class="field" type="text" 
        :value="getValueToDisplay" placeholder="Celular" :disabled="isDisabled"
        @input="handleInput($event.target.value)">
    </div>

</template>

<script setup>
import { defineProps, defineEmits,ref,computed,watch} from 'vue';


const props = defineProps({
    modelValue:{
        type: String,
        default:""
    },
    isFieldSmall:{
        type:Boolean,
        default:false
    },
    isDisabled:{
        type:Boolean,
        default:false
    }
});
const emit = defineEmits('update:modelValue');
const formattedValue = ref(props.modelValue);

function handleInput(value) {
    if(props.isDisabled === false){
        const cleaned = value.replace(/\D/g, '');
        formattedValue.value = formatCellNumber(cleaned);
        emit('update:modelValue', cleaned);
    }
}

function formatCellNumber(value){
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) {
        return cleaned;
    } else if (cleaned.length <= 6) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 10) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2,7)}-${cleaned.slice(7,11)}`;
    }
}
const onDisabledChange = ()=>{
    const formattedValue = ref(props.modelValue);
    handleInput(formattedValue.value);
}

watch(() => props.isDisabled, onDisabledChange);

const getValueToDisplay = computed(() => {
    if(props.isDisabled === true){
        return formatCellNumber(props.modelValue);
    }
    return formattedValue.value;
});


</script>


<style scoped>
.cardform{
    margin: 10px 0px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
}
.field{
    height: 39px;
    font-size: 16px;
    border: 1px solid rgba(var(--primary--500), 0.5);
    border-radius: 8px;
    width: 296px;
    padding: 0px 10px;
    background-color: rgba(var(--primary--100), 0.3);
    flex-basis: 100%;
}
</style>