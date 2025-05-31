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
