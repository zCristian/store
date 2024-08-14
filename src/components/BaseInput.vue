<template>
    <div :class="[label ? 'input-wrap-wlabel': 'input-wrap']">
        <label v-if="label">{{ label }}</label>
        <input :class="[{'sm-field':isFieldSmall},{'field':!isFieldSmall}]" type="text" 
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
        type: [String],
        default: ""
    },
    verifyBlur: {
        type: Boolean,
        default: false
    },
    isFieldSmall: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
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
    emit('update:modelValue', event.target.value);
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

.field{
    font-size: 16px;
    border: 1px solid rgba(var(--primary--500), 0.5);
    border-radius: 8px;
    width: 296px;
    padding: 0px 10px;
    background-color: rgba(var(--primary--100), 0.3);
    height: 39px;
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