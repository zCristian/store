<template>
    <div class="filter-wrap">
        <div class="filter-head">
            <BaseSearchBar :placeholder="'Busque por uma categoria'" v-model="filterCategory" 
            @exhibited-categories="handleExhibitedCategories"/>
        </div>
        <div class="filter-content">
            <span  @click="selectCategory(category)" 
            :class="[{'selected-category': isSelected(category)},'category-tag']" 
            v-for="category in categories" :key="category.codigoCategoria">{{ category.nomeCategoria }}</span>
        </div>
    </div>
</template>
<script setup>

import { ref,inject,defineProps,defineEmits} from 'vue';
import BaseSearchBar from '@/components/BaseSearchBar.vue';
const categories = inject('allcategories');
const emit = defineEmits(['select-category','unselect-category']);
const selectedCategories = ref([])
const props = defineProps({
    productCategories:{
        type:Array,
        required: true
    }
})

const filterCategory = ref("");
const selectCategory=(category)=>{
    if(isSelected(category)){
        selectedCategories.value.pop(category);
        emit('unselect-category',category);
    }else{
        selectedCategories.value.push(category);
        emit('select-category', category);
    }
    
}
const handleExhibitedCategories = (exhibitedCategories)=>{
    categories.value = exhibitedCategories;
}

const isSelected =(category)=>{
    return props.productCategories.some((productCategory)=>productCategory.codigoCategoria===category.codigoCategoria);
}
</script>

<style scoped>
.filter-wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
}
.filter-head{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.filter-content{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
.category-tag{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    border-radius: 40px;
    padding: 5px 10px;
    border: 1px solid rgba(var(--primary--500),0.5);
    cursor: pointer;
    &:hover{
        background:rgba(127, 87, 241, 0.2) ;
    }
}
.selected-category{
    border: 1px solid rgb(var(--primary--600));
    background-color: rgba(var(--primary--100),0.5);
    color: rgb(var(--primary--600));
}
</style>