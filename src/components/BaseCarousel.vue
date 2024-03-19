  <template>
    <div class="slider">
        <div class="slides">

            <input type="radio" name="radio-btn" id="radio1">
            <input type="radio" name="radio-btn" id="radio2">
            <input type="radio" name="radio-btn" id="radio3">
            <input type="radio" name="radio-btn" id="radio4">
            

            <div class="slide first">
                <img src="../assets/homebanner.svg" class="homesvg">
            </div>
            <div class="slide">
                <img src="../assets/homebanner.svg" class="homesvg">
            </div> 
            <div class="slide">
                <img src="../assets/homebanner.svg" class="homesvg">
            </div>
            <div class="slide">
                <img src="../assets/homebanner.svg" class="homesvg">
            </div>

            <div class="navigation-auto">
                <div class="auto-btn1"></div>
                <div class="auto-btn2"></div>
                <div class="auto-btn3"></div>
                <div class="auto-btn4"></div>
            </div>
        </div>


        <div class="manual-navigation">
            <label for="radio1" class="manual-btn"></label>
            <label for="radio2" class="manual-btn"></label>
            <label for="radio3" class="manual-btn"></label>
            <label for="radio4" class="manual-btn"></label>
        </div>
    </div>
</template>

<script setup>
import {onMounted,ref} from 'vue'
onMounted(()=>{
    let count =ref(1);
    document.getElementById("radio1").checked = true;

    setInterval(() => {
        nextImage();
    }, 5000);
    
    const nextImage = () =>{
        count.value ++;
        if(count.value>4){
            count.value =1;
        }
        document.getElementById("radio" + count.value).checked = true;
       
    }
})


</script>

<style scoped>
.slider{
    margin:0 auto;
    width:  1880px;
    height: 415px;
    overflow: hidden;
}

.slides{
    width: 400%;
    height: 415px;
    display: flex;
}

.slides input{
    display: none;
}

.slide{
    width: 25%;
    position: relative;
    transition: 2s;
}
.slide img{
    width: 1880px;
    height: 415px;
}

.manual-navigation{
    position: absolute;
    width: 1880px;
    margin-top: -40px;
    display: flex;
    justify-content: center;
}

.manual-btn{
    border: 3px solid #7f57f1;
    padding: 6px;
    border-radius: 10px;
    cursor: pointer;
    transition: 1s;
}

.manual-btn:not(:last-child){
    margin-right: 80px;
}

.manual-btn:hover{
    background-color: #7f57f1;
}
#radio1:checked ~ .first{
    margin-left: 0;
}

#radio2:checked ~ .first{
    margin-left: -25%;
}

#radio3:checked ~ .first{
    margin-left: -50%;
}

#radio4:checked ~ .first{
    margin-left: -75%;
}

.navigation-auto div{
    border:3px solid #7f57f1;
    padding: 6px;
    border-radius: 10px;
    cursor: pointer;
    transition: 1s;
}

.navigation-auto{
    position: absolute;
    width: 1880px;
    margin-top: 375px;
    display: flex;
    justify-content: center;
}

.navigation-auto div:not(:last-child){
    margin-right: 80px;
}

#radio1:checked ~ .navigation-auto .auto-btn1{
    background-color: #7f57f1;
}
#radio2:checked ~ .navigation-auto .auto-btn2{
    background-color: #7f57f1;
}
#radio3:checked ~ .navigation-auto .auto-btn3{
    background-color: #7f57f1;
}
#radio4:checked ~ .navigation-auto .auto-btn4{
    background-color: #7f57f1;
}


</style>