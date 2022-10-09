/*----- constants -----*/
const CHAR_LOOKUP = {
       kai : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyeJCrpSbgrh859l_lmJYrdEPZr2QMYfXnGQ&usqp=CAU',
       lloyd : 'https://www.kindpng.com/picc/m/483-4832798_lloyd-ninjago-lego-ninjago-lloyd-hd-png-download.png',
       jay : 'https://www.nicepng.com/png/detail/178-1788079_related-wallpapers-lego-dimensions-1-fun-ninjago-jay.png',
       wu :'https://i.pinimg.com/564x/19/2d/5c/192d5c7931b4f4a0116d5a2ca41c0379.jpg',
       cole: 'https://images-na.ssl-images-amazon.com/images/I/51oEznB3BSL._AC_UL600_SR600,600_.jpg',
       zane: 'https://i.etsystatic.com/9915541/r/il/3ae1ee/3477277820/il_570xN.3477277820_a9m3.jpg'
};

  /*----- state variables -----*/
let board;
let card1;
let card2;
let matched = 0;
let chances = 8;

  /*----- cached elements  -----*/
const cards = document.getElementsById('memory-card');
const playButton = document.querySelector('button');

  /*----- event listeners -----*/
  document.getElementById('memory-game').addEventListener('click', handleMove);
  playButton.addEventListener('click', initialize);

  /*----- functions -----*/
  initialize();

  function initialize(){


    render();

  }

  function render(){

  }