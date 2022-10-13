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
const wrongAudio = new Audio('mp3/wrong-47985.mp3')
const loseAudio = new Audio('mp3/evil-laugh-49831.mp3');

/*----- cached elements  -----*/
const playButton = document.getElementById('reset');
const messageEl = document.querySelector('h1');
const MessageChannel = document.querySelector('h3');
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");


/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleClick);
playButton.addEventListener('click', refresh);

/*----- functions -----*/
initialize();

function initialize() {
  cards = shuffle();
  firstChoice = null;
  ignore = false;
  renderGamePage();
  attempts = 0;


}


function renderGamePage() {
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

  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);
  }

  return cards;
}

// Placing gaurds and update state then call render

function handleClick(event) {
  const cardIndex = parseInt(event.target.id); // converting the string id to number
  console.log('attempts')
  if (isNaN(cardIndex) || ignore || attempts === 10) return; // Guard
  const card = cards[cardIndex];

  if (!firstChoice) {
    firstChoice = card;
    console.log('if1',firstChoice,secondChoice);
    renderGamePage();
  }
  else {
    if(isNaN(cardIndex) ||
    ignore ||
    cards[cardIndex] === firstChoice) {
    return; }
    attempts++;
    secondChoice = card;
    renderGamePage();
    if (firstChoice.img === secondChoice.img) {
      console.log('if2',firstChoice,secondChoice);
      firstChoice.matched = secondChoice.matched = true;
      firstChoice = null;
      secondChoice = null;
      matchAudio.play();
      isGameOver();
    }
    else {
      console.log('if3',firstChoice,secondChoice);
      const myTimeout = setTimeout(setNull, 1000);
      function setNull() {
        firstChoice = null;
        secondChoice = null;
        wrongAudio.play();
        isGameOver();
      }
    }
  }
}

// Refreshing board with button
function refresh() {
  window.location.reload();
}

// popup box
function toggleModal() {
  modal.classList.toggle("show-modal");
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);


// Winning logic
function isGameOver() {
  if (cards.every(card => card.matched === true)) {
    messageEl.innerText = "WE HAVE A NINJA";
  } if  (attempts >= 10) { 
    toggleModal();
  loseAudio.play();
  return;
}
renderGamePage();
}








