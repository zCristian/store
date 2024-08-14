<template>
    <div class="switch-wrap">
        <slot name="switchtext">
        </slot>
        <div :class="['switch-path',isActive? 'active-switch':'unactive-switch']" @click="toggleSwitch">
            <div :class="['switch-ball',isActive? 'active-ball':'unactive-ball']"></div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';

const isActive = ref(false);

const toggleSwitch=()=>{
    isActive.value = !isActive.value;
}
</script>

<style scoped>
.switch-wrap{
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    font-size: 20px;
    align-items: center;
}

.switch-path{
    height: 30px;
    width: 50px;
    border-radius: 99px;
    display: flex;
    align-content: center;
    cursor: pointer;  
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.22);
}

.active-switch{
   justify-content: flex-end; 
   background-color: rgb(var(--primary--500));
}
.unactive-switch{
    justify-content: flex-start;
    background-color: rgba(var(--primary--black),0.4);
}
.switch-ball{
    height: 29px;
    width: 29px;
    border-radius: 99px;
    background-color: white;
    border: 1px solid rgba(var(--primary--black),0.22);
}

.active-ball{
    box-shadow: -3px 1px 3px 0 rgba(var(--primary--black),0.22);
}
.unactive-ball{
    box-shadow: 3px 1px 3px 0 rgba(var(--primary--black),0.25);
}
</style>

