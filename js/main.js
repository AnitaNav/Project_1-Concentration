/*----- constants -----*/
const CHAR_LOOKUP = [
  { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyeJCrpSbgrh859l_lmJYrdEPZr2QMYfXnGQ&usqp=CAU', matched: false },
  { img: 'https://www.kindpng.com/picc/m/483-4832798_lloyd-ninjago-lego-ninjago-lloyd-hd-png-download.png', matched: false },
  { img: 'https://www.nicepng.com/png/detail/178-1788079_related-wallpapers-lego-dimensions-1-fun-ninjago-jay.png', matched: false },
  { img: 'https://i.pinimg.com/564x/19/2d/5c/192d5c7931b4f4a0116d5a2ca41c0379.jpg', matched: false },
  { img: 'https://images-na.ssl-images-amazon.com/images/I/51oEznB3BSL._AC_UL600_SR600,600_.jpg', matched: false },
  { img: 'https://i.etsystatic.com/9915541/r/il/3ae1ee/3477277820/il_570xN.3477277820_a9m3.jpg', matched: false }
];
const CARD_BACK = 'https://images.squarespace-cdn.com/content/v1/5bbe8cab7eb88c0882112cab/1640105542555-5RXB0HGSIOFK7KK3A9HJ/y7878yuuyuy.png?format=500w';

/*----- state variables -----*/
let cards; // Array of 12 cards
let firstChoice; // First card clicked
let secondChoice; // Second card
let attempts = 0;
let ignore;
let winner;
//const startAudio = new Audio('mp3/opening-8043.mp3');
const matchAudio = new Audio('mp3/news-ting-6832.mp3');

/*----- cached elements  -----*/
const playButton = document.querySelector('button');
const messageEl = document.querySelector('h1');
const MessageChannel = document.querySelector('h3');
const audio = document.querySelector('audio');

/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleClick);
playButton.addEventListener('click', initialize);

/*----- functions -----*/
initialize();

function initialize() {
  cards = shuffle();
  firstChoice = null;
  ignore = false;
 // startAudio.play();
  render();
  attempts = 0;
  

}


function render() {
  cards.forEach(function (card, index) {
    const imgEl = document.getElementById(index);
    const src = (card.matched || card === firstChoice || card === secondChoice) ? card.img : CARD_BACK;
    imgEl.src = src;
  });

  MessageChannel.innerHTML = `Attempts : ${attempts}`;


}

// Shuffle cards 
function shuffle() {
  let tempCards = [];
  let cards = []; // Shuffled cards array

  for (let card of CHAR_LOOKUP) {
    tempCards.push({ ...card }, { ...card });
  }

  //console.log(tempCards);
  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);
    //console.log(card);
  }

  return cards;

}

// Placing gaurds and update state then call render

function handleClick(event) {
  const cardIndex = parseInt(event.target.id); // converting the string id to number
  if (isNaN(cardIndex) || ignore || attempts === 15) return; // Gaurd
  const card = cards[cardIndex];

  // when both choices are set and a click is done outside of the cards
  if (firstChoice) {
    if (secondChoice) {
      if (firstChoice.img === secondChoice.img) {
        // correct match
        firstChoice.matched = secondChoice.matched = true;
        matchAudio.play();

      }

      firstChoice = null;
      secondChoice = null;
    }


    // setting second choice based on selection
    else {
      if (
        isNaN(cardIndex) ||
        ignore ||
        cards[cardIndex] === firstChoice) {
        return;
      }
      secondChoice = card;
      setInterval(function flipTimer() {
        cards[0].matched = false;
        cards[1].matched = false;
        render();
        cards = [];
      }, 200);
      attempts++;
    }
  }

  // setting first choice based on selection
  else {
    firstChoice = card;
  }

  gameOver();
  render();
}

// Winning logic
function gameOver() {

  //console.log(attempts);

  if (cards.every(card => card.matched === true)) {
    //messageEl.innerText = "WE HAVE A NINJA";

  }

  if (attempts >= 15) {
    messageEl.innerText = "GAME OVER";
    return;
  }

  render();
}







