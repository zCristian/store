<template>
    <div class="input-wrap">
        <label v-if="label">{{ label }}</label>
        <input class="field" type="text" 
        :value="getValueToDisplay" :placeholder="placeholder" :disabled="isDisabled"
        @input="handleInput($event.target.value)">
    </div>

</template>

<script setup>
import { defineProps, defineEmits,ref,computed} from 'vue';


const props = defineProps({
    label:{
        type: [String,Boolean],
        default: false
    },
    placeholder:{
        type:[String,Boolean],
        default: false
    },
    modelValue:{
        type: String,
        default:""
    },
    isDisabled:{
        type:Boolean,
        default:false
    }
});

const emit = defineEmits('update:modelValue');
const formattedValue = ref(props.modelValue);

function handleInput(value) {
    const cleaned = value.replace(/\D/g, '');
    formattedValue.value = formatCPF(cleaned);
    emit('update:modelValue', cleaned);
}

function formatCPF(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) {
        return cleaned;
    } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    } else if (cleaned.length <= 9) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    } else {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
    }
}

const getValueToDisplay = computed(() => {
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