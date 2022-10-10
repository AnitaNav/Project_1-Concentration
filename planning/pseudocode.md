Pseudocode :
 In this game an even number of cards are displayed on the board faced down. The player takes turns flipping a pair of cards.
If the flipped pair of cards match , then it is a win for the player and the cards remain open.
If the cards do not match, the selected pair of cards remain open for a few seconds and  flip back.
The player would get eight chances to win the game (pick all the pairs).
// board should be intialized to start the game
//player will be allowed to select two cards from the board
// player should not be allowed to open more than two cards
//cards are compared -> if matched cards stay open else flip back
//the selected pair of cards should be stored temporarily in an element
// board should be rendered back if cards are unmatched
//if all cards are matched -> game over
//if player runs out of chances -> game over


Constants : Player, Cards, Turns
Event Listeners : click
Functions : render - board, message
                   Check, winning

 /*----- constants -----*/


  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/