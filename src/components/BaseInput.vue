<template>
    <div class="input-wrap">
        <label v-if="label">{{ label }}</label>
        <input :class="[{'sm-field':isFieldSmall},'field']" type="text" 
        :value="modelValue" :placeholder="placeholder" :disabled="isDisabled" 
        @input="$emit('update:modelValue',$event.target.value)" @blur="blurEvent()">
    </div>

</template>

<script setup>
import { defineProps, defineEmits } from 'vue';


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
    verifyBlur:{
        type: Boolean,
        default: false
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
const emit = defineEmits(['blur-event']);
const blurEvent =()=>{
    if(props.verifyBlur==true){
        emit('blur-event');
    }
}
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
    border: 2px solid #7F57F1;
    border-radius: 10px;
    width: 296px;
    padding: 0px 10px;
    background-color: #F1EFF8;
    
}
.sm-field{
        width: 128px;
        height: 39px;
        font-size: 16px;
        border: 2px solid #7F57F1;
        border-radius: 10px;
        padding: 0px 10px;
        background-color: #F1EFF8;
    }
</style>