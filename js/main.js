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
let attempts;
let ignore;
let winner;

/*----- cached elements  -----*/
const playButton = document.querySelector('button');

/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleClick);


/*----- functions -----*/
initialize();
// board should be intialized to start the game
//player will be allowed to select two cards from the board
// player should not be allowed to open more than two cards
//cards are compared -> if matched cards stay open else flip back
//the selected pair of cards should be stored temporarily in an element
// board should be rendered back if cards are unmatched
//if all cards are matched -> game over
//if player runs out of chances -> game over
function initialize() {
  cards = shuffle();
  firstChoice = null;
  ignore = false;
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
  if (isNaN(cardIndex) || ignore) return; // Gaurd
  const card = cards[cardIndex];
  if (firstChoice) {
    if (secondChoice) {
      if (firstChoice.img === secondChoice.img) {
        // correct match
        firstChoice.matched = secondChoice.matched = true;
      }
      firstChoice = null;
      secondChoice = null;
    } else {
      if ( 
          isNaN(cardIndex) || 
          ignore || 
          cards[cardIndex] === firstChoice) return;
        secondChoice = card;
        attempts++;
    }

  } else {
    firstChoice = card;
  }
  render();
}

