<template>
    <NewsForm/>

    <div class="footercontainer">
        <div class="box">
                <div class="logodiv"><img class="logo" src="../assets/logo.svg" alt="logo"></div>
                    <div class="content">
                        <div class="contactus">
                            <h4>Atendimento</h4>
                            <h5>Telefone:</h5><span>(11) 99999-9999</span>
                            <h5>E-mail:</h5><span>sca@celulou.com.br</span>
                            <h5>Horário de Atendimento:</h5>
                            <p>Seg. à Sex. 9h às 18h</p>
                            <p>Sab. Dom. das 9h às 12h</p>
                        </div>
                        <div class="institutional">
                            <h4>Institucionais</h4>
                            <a href="/">Quem Somos</a>
                            <a href="/">Perguntas Frequentes</a>
                            <a href="/">Nossas Lojas</a>
                            <a href="/">Política de Troca e Devolução</a>
                        <a href="/">Política de Privacidade</a>
                        </div>
                        <div class="foryou">
                            <h4>Para você</h4>
                            <a href="/">Minhas Compras</a>
                            <a href="/">Rastrear Pedidos</a>
                            <a href="/">Minha Conta</a>
                        </div>
                        <div class="paymethods">
                            <h4>Formas de Pagamento</h4>
                            <img src="../assets/paymentflags.svg">
                        </div>
                        <div class=security>
                            <h4>Segurança</h4>
                            <img src="../assets/certificacoes.svg">
                        </div>
                    </div> 
            </div>
    </div>
    <div class="copyright">
        <p>Copyright © 2024 Celulou E-Commerce. Todos os direitos reservados. CNPJ: 00.000.000/0000-00</p>
    </div>
</template>

<script setup>
    import NewsForm from '../components/NewsForm.vue';
</script>

<style scoped>

.footercontainer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    
}
.box{
    display: flex;
    width: 1220px;
    justify-content: center;
    flex-wrap: wrap;
}
.logodiv{
    display: flex;
    flex-basis: 100%;
    justify-content: center;

}
.logo{
    height: 60px;
    width: 175px;
}

.content{
    margin-top: 20px ;
    display: flex;
    flex-wrap: nowrap;
    flex-basis: 100%;
    justify-content: space-around;
}
.contactus{
    display: flex;
    flex-direction: column;
    
}
.institutional{
    display: flex;
    flex-direction: column;
  
}
.foryou{
    display: flex;
    flex-direction: column;
}
a{
    margin-top: 10px;
    text-decoration: none;
    color: black;
}
h4{
    color: #7F57F1;
}
h5{
    margin-bottom: 8px;
}
p{
    margin: 0px;
}
.copyright{
    margin-top: 20px;
    background-color: #f3f3f3;
    margin-bottom: 0px;
    text-align: center;
    padding: 5px 5px 5px 0px;
}
</style>