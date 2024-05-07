<template>
    <div class="card">
        <h4>CARD DE ENDEREÇO</h4>
        <hr>
        <div class="head">
            <p>Titulo</p>
        </div>
        <div class="main">
            <p>Corpo</p>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.card{
    background-color: #F1EFF8;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    margin: 10px;
    border-radius: 15px;
    height: 150px;
    h4{
        margin: 0px;
    }
}
hr{
    width: 300px;
    height: 0.1px;
    border: 0.1px solid black;
}
.head{
    width: 300px;
}

</style>