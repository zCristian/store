<template>
    <div class="container">
        <div class="content">
            <div class="text">
                <h3>Fique por dentro!</h3>
                <p>Inscreva-se na nossa newsletter e receba novidades, promoções exclusivas e muito mais</p>
            </div>
            <div class="form">
                <div class="textform">
                    <label>Nome</label>
                    <input class="nameinput" type="text" placeholder="Insira seu nome">
                </div>
                <div class="textform">
                    <label>E-mail</label>
                    <input class="emailinput" type="text" placeholder="Insira seu e-mail">
                </div>
                <button>Enviar</button>
                <div class="checkform">
                    <input class="checkinput" type="checkbox">
                    <span>Aceito compartilhar minhas informações com Celulou</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container{
    margin-top: 50px;
    width: 100%;
    background-color: #7f57f1;
    color:white;
    height: 230px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.content{
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 1220px;
}
.text{
    flex-basis: 28%;
    font-size: 15px;
    height: 120px;
}

.form{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 780px;
    height: 120px;
}

.textform{
    display: flex;
    flex-direction: column;
    width: 295px;
    font-size: 18px;
}
label{
    margin-bottom: 5px;
}
button{
    width: 150px;
    height: 44px;
    margin-top: 24px;
    border-radius: 10px;
    font-size: 18px;
    background-color:#E6E6E6 ;
    border:none;
    color: #7f57f1;
}

.nameinput,.emailinput{
    height: 40px;
    border: none;
    border-radius: 10px;
    padding: 0px 5px 0px 15px;
    font-size: 17px;
}
span{
    font-size: 16px;
    margin-left: 10px;
}
</style>