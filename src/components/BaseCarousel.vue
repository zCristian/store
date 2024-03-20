  <template>
<div class="content">
    <button class="left-arrow"><CircleChevronLeft class="larrowicon"/></button>
        <div class="slider">
            <div class="slides">

                
                
            
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
    <button class="right-arrow"><CircleChevronRight class="rarrowicon"/></button> 
</div>
</template>

<script setup>
import { CircleChevronRight, CircleChevronLeft } from 'lucide-vue-next';
//import {onMounted,ref} from 'vue'
/*onMounted(()=>{
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
*/

</script>

<style scoped>
.content{
    display: flex;
    width: 100%;
    background-color: #E6DDFC;
    justify-content: space-around;
    height: 410px;

}
.slider{
    flex-basis: 97%;
    margin:0 auto;
    width:  1770px;
    height: 410px;
    overflow: hidden; 
    background-color: #E6DDFC;
}
.homesvg{
    height: 410px;
    background-color: #E6DDFC;
  }

.slides{
    width: 400%;
    height: 410px;
    display: flex;
}
.left-arrow,.right-arrow{
    display: flex;
    align-items: center;
    margin: 0px;
    color: #7f57f1;
    border: none;
    background-color: #E6DDFC;
    flex-basis: 3%;
    width: 32px;
    cursor: pointer;
}
.larrowicon,.rarrowicon{
    height: 30px;
    width: 30px;
}
.larrowicon:hover{
    height: 32px;
    width: 32px;
}
.rarrowicon:hover{
    height: 32px;
    width: 32px;
}
.slides input{
    display: none;
}

.slide{
    width: 25%;
    position: relative;
    transition: 2s;
}


.manual-navigation{
    position: absolute;
    width: 1770px;
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
    width: 1770px;
    margin-top: 370px;
    display: flex;
    justify-content: center;
}

.navigation-auto div:not(:last-child){
    margin-right: 80px;
}




</style>