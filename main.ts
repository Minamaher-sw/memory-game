//#region  imports
import { IPrepare } from "./models/prepare.modal";
import { ICard } from "./models/card.model";
//#endregion
//#region  variables
const prepare:IPrepare ={}
prepare.cards =[]
prepare.progress =0 ;//0%

prepare.fullTrack = new Audio("./assets/audio/fulltrack.mp3");
prepare.failAudio =new Audio("./assets/audio/fail.mp3");
prepare.flipAudio =new Audio("./assets/audio/flip.mp3")
prepare.gameOverAudio =new Audio("./assets/audio/game-over.mp3")
prepare.goodAudio =new Audio("./assets/audio/good.mp3");
//operate always
prepare.fullTrack.loop =true;
const numberOfCards =20;
// temporary number of finished cards
const tempNumbers=[];
// html  especial to card
let cardsHtmlContent="";
//#endregion

//#region  function deleration 
const getRandomInit=(min:number,max:number):number=>
{
    let result:number;
    let exists:boolean=true;
    min =Math.ceil(min);
    max= Math.floor(max);

    while(exists){
        result =Math.floor(Math.random()*(max -min +1))+min;
        if(!tempNumbers.find( num => num === result.toString())){
            exists =false;
            tempNumbers.push(result.toString())
        }
    }
    return result;
}

const toggleFlib =(index:number):void=>{
    prepare.fullTrack.play();
    const card:ICard =prepare.cards[index];

    if(!card.flib && card.clickable){
        flib(card ,index);
        selectCard(card,index);
    }
}
const flib =(card:ICard ,index:number):void=>{
    prepare.flipAudio.play();
    if(card){
        card.flib = card.flib ==="" ?'flib':"";
        document.getElementById(`card-flib-${index}`).classList.value =card.flib;
    }
}

const selectCard =(card:ICard ,index:number):void=>{
    if(!prepare.selectedCard_1){
        prepare.selectedCard_1 =card;
        prepare.selectedIndex_1 =index;
    }
    else if(!prepare.selectedCard_2){
        prepare.selectedCard_2 =card;
        prepare.selectedIndex_2 =index;
    }
    // checking 
    if(prepare.selectedCard_1 && prepare.selectedCard_2)
    {
        if(prepare.selectedCard_1.src === prepare.selectedCard_2.src ){

            prepare.selectedCard_1.clickable =false;
            prepare.selectedCard_2.clickable =false;
            prepare.selectedCard_1 =null;
            prepare.selectedCard_2 =null;
            stopAudio(prepare.failAudio);
            stopAudio(prepare.goodAudio)
            prepare.goodAudio.play();
            changeProgrss();
            checkFinish();
        }
        else{
            setTimeout(()=>{
                stopAudio(prepare.failAudio);
                stopAudio(prepare.goodAudio);
                prepare.failAudio.play();
                flib(prepare.selectedCard_1,prepare.selectedIndex_1);
                flib(prepare.selectedCard_2,prepare.selectedIndex_2);
                prepare.selectedCard_1 =null;
                prepare.selectedCard_2 =null;
            },1000)
        }
    }
}

const changeProgrss =()=>{
    const progress =(prepare.cards.filter(card => !card.clickable).length / numberOfCards)*100;
    const preogressElement = document.getElementById("progress");
    preogressElement.style.width =`${progress}%`
    preogressElement.innerText =`${progress}%`
}

const checkFinish =()=>{
    if(prepare.cards.filter(card => !card.clickable).length == numberOfCards){
        stopAudio(prepare.failAudio);
        stopAudio(prepare.goodAudio);
        stopAudio(prepare.fullTrack);
        prepare.gameOverAudio.play();
    }
}

const stopAudio=(audio:HTMLAudioElement)=>{
    if(audio && audio.play)
    {
        audio.pause;
        audio.currentTime=0;
    }
}