<template>
    <div class="checkbox-wraper">
        <label for="checkbox" id="checkbox" @click="handleInput(!updatedValue)">{{ props.labelText }}</label>
        <div class="check-wraper">
            <input type="checkbox" name="checkbox"  :class="[modelValue? 'checked box': 'unchecked box']"
            @input="handleInput($event.target.value)" :value="updatedValue">
            <Check v-if="updatedValue"  @click="handleInput(!updatedValue)" class="check-icon"/>    
        </div>
        
    </div>

</template>
<script setup>
import {ref, defineProps, defineEmits} from 'vue';
import { Check } from 'lucide-vue-next';

const props = defineProps({
    labelText:{
        type:String,
        required: true
    },
    modelValue:{
        type:Boolean,
        required:true
    }
})

const emit = defineEmits('update:modelValue');
const updatedValue = ref(props.modelValue);

function handleInput(value) {
        console.log(value);
        updatedValue.value = value;
        emit('update:modelValue', value);
}
</script>
<style scoped>
.checkbox-wraper{
    display: flex;
    flex-direction: row;
    height: 20px;
    width: 150px;
    label{
        cursor: pointer;
    }
}
.check-wraper{
    display: flex;
    align-items: center;
   
}
.box{
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background-color: transparent;
    border-radius: 4px;
    border: 2px solid #7F57F1;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.215, 0.610, 0.355, 1);
    
}
.checked{
    background-color: rgb(var(--primary--500));
}
.check-icon{
    display: flex;
    justify-content: center;   
    height: 18px;
    width: 18px;
    color: white;
    position: relative;
    bottom: 0px;
    right: 21px;
    cursor: pointer;
    
}

</style>