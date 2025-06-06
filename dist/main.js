//#endregion
//#region  variables
const prepare = {};
prepare.cards = [];
prepare.progress = 0; //0%
prepare.fullTrack = new Audio("./assets/audio/fulltrack.mp3");
prepare.failAudio = new Audio("./assets/audio/fail.mp3");
prepare.flipAudio = new Audio("./assets/audio/flip.mp3");
prepare.gameOverAudio = new Audio("./assets/audio/game-over.mp3");
prepare.goodAudio = new Audio("./assets/audio/good.mp3");
//operate always
prepare.fullTrack.loop = true;
const numberOfCards = 20;
// temporary number of finished cards
const tempNumbers = [];
// html  especial to card
let cardsHtmlContent = "";
//#endregion
//#region  function deleration 
const getRandomInit = (min, max) => {
    let result;
    let exists = true;
    min = Math.ceil(min);
    max = Math.floor(max);
    while (exists) {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!tempNumbers.find(num => num === result.toString())) {
            exists = false;
            tempNumbers.push(result.toString());
        }
    }
    return result;
};
const toggleFlip = (index) => {
    prepare.fullTrack.play();
    const card = prepare.cards[index];
    if (!card.flib && card.clickable) {
        flib(card, index);
        selectCard(card, index);
    }
};
const flib = (card, index) => {
    prepare.flipAudio.play();
    if (card) {
        card.flib = card.flib === "" ? 'flip' : "";
        document.getElementById(`card-flip-${index}`).classList.value = card.flib;
    }
};
const selectCard = (card, index) => {
    if (!prepare.selectedCard_1) {
        prepare.selectedCard_1 = card;
        prepare.selectedIndex_1 = index;
    }
    else if (!prepare.selectedCard_2) {
        prepare.selectedCard_2 = card;
        prepare.selectedIndex_2 = index;
    }
    // checking 
    if (prepare.selectedCard_1 && prepare.selectedCard_2) {
        if (prepare.selectedCard_1.src === prepare.selectedCard_2.src) {
            prepare.selectedCard_1.clickable = false;
            prepare.selectedCard_2.clickable = false;
            prepare.selectedCard_1 = null;
            prepare.selectedCard_2 = null;
            stopAudio(prepare.failAudio);
            stopAudio(prepare.goodAudio);
            prepare.goodAudio.play();
            changeProgrss();
            checkFinish();
        }
        else {
            setTimeout(() => {
                stopAudio(prepare.failAudio);
                stopAudio(prepare.goodAudio);
                prepare.failAudio.play();
                flib(prepare.selectedCard_1, prepare.selectedIndex_1);
                flib(prepare.selectedCard_2, prepare.selectedIndex_2);
                prepare.selectedCard_1 = null;
                prepare.selectedCard_2 = null;
            }, 1000);
        }
    }
};
const changeProgrss = () => {
    const progress = (prepare.cards.filter(card => !card.clickable).length / numberOfCards) * 100;
    const preogressElement = document.getElementById("progress");
    preogressElement.style.width = `${progress}%`;
    preogressElement.innerText = `${progress}%`;
};
const checkFinish = () => {
    if (prepare.cards.filter(card => !card.clickable).length == numberOfCards) {
        stopAudio(prepare.failAudio);
        stopAudio(prepare.goodAudio);
        stopAudio(prepare.fullTrack);
        prepare.gameOverAudio.play();
    }
};
const stopAudio = (audio) => {
    if (audio && audio.play) {
        audio.pause;
        audio.currentTime = 0;
    }
};
//#endregion
//#region Game Logic
for (let counter = 0; counter < (numberOfCards / 2); counter++) {
    prepare.cards.push({
        id: getRandomInit(0, numberOfCards),
        src: `./assets/images/${counter}.jbg`,
        flib: "",
        clickable: true,
        index: counter,
    });
    prepare.cards.push({
        id: getRandomInit(0, numberOfCards),
        src: `./assets/images/${counter}.jbg`,
        flib: "",
        clickable: true,
        index: counter,
    });
    console.log(prepare.cards);
}
//sorting assending 
prepare.cards.sort((a, b) => a.id > b.id ? 1 : -1);
prepare.cards.forEach((item, index) => {
    cardsHtmlContent += `
    <div class="col-sm-3 col-lg-2">
        <!-- Card Flip -->
        <div onclick="toggleFlip(${index})" class="card-flip">
            <div id="card-flip-${index}">
                <div class="front">
                    <!-- front content -->
                    <div class="card">
                        <img class="card-image" src="./assets/back.jpg" alt="Loading...">
                        <span class="card-content">${index + 1}</span>
                    </div>
                </div>
                <div class="back">
                    <!-- back content -->
                    <div class="card">
                        <img src="./assets/images/${item.index}.jpg" alt="Image [100%x180]" data-holder-rendered="true"
                            style="height: 120px; width: 100%; display: block;">
                    </div>
                </div>
            </div>
        </div>
        <!-- End Card Flip -->
    </div>
    `;
});
document.getElementById("cards").innerHTML = cardsHtmlContent;
