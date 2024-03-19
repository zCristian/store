<template>
<div class="aboutusdiv">
    <div class="celimg">
        <img src="../assets/celulou.svg">
    </div>
    <div class="content">
        <h2>Celulou - A Sua Loja Online de Celulares</h2>
        <p>
            Explore o universo dos smartphones na Celulou, sua loja de celulares online! Com uma variedade incrível e preços competitivos, 
            estamos aqui para tornar sua experiência de compra rápida e descomplicada. Encontre os últimos modelos de celulares,
            desde opções premium até alternativas acessíveis, tudo em um só lugar.
         </p>
        <p> 
            Nosso site é fácil de navegar, proporcionando uma experiência de compra online sem complicações. 
            Aproveite ofertas exclusivas e promoções que garantem o melhor custo-benefício para nossos clientes. 
            Nossa equipe de atendimento está pronta para ajudar, garantindo que suas dúvidas sejam rapidamente resolvidas. 
            Descubra os melhores celulares com a Celulou. Conecte-se ao futuro agora mesmo!
        </p>
        <div class="socials">
            <div class="icondiv">
                <Instagram class="socialicon inst"/></div>
            <div class="icondiv">
                <Facebook class="socialicon fb"/></div>
            <div class="icondiv">
                <Linkedin class="socialicon link"/>
            </div>
            
        </div>
        <div class="moreinfo">
            <button>Saiba mais</button>
        </div>
    </div>
</div>
</template>
<script setup>
    import { Instagram,Linkedin, Facebook } from 'lucide-vue-next';
</script>
<style scoped>
    .aboutusdiv{
        display: flex;
        justify-content: center;
        margin-top: 55px;
        
    }

    h2{
        margin-top: 0px;
        font-size: 30px;
        margin-bottom: 10px;
        color: #7f57f1;
    }
    .content{
        display: flex;
        flex-wrap: wrap;
        width: 840px ;
        margin-left: 130px;
    }
    p{  
        font-size: 17px;
        margin-top: 0px;
        margin-bottom: 10px;
    }
    .socials{
        display: flex;
        flex-basis: 100%;
    }
    .icondiv{
        background-color: #7f57f1;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        height: 40px;
        width: 40px;
    }
    .socialicon{
        color: white;
       
        margin: 4px;
    }
    .fb{
       
        fill: white;
    }
    .link{
        fill: white;
    }
    .moreinfo{
        display: flex;
        flex-basis: 100%;
    }
    button{
        margin-top: 15px;
        border-radius: 10px;
        border:none;
        background-color: #7f57f1;
        color: white;
        width: 135px;
        height: 45px;
        font-size: 17px;
    }
</style>