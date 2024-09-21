// game logic
function Card(suit,value){
    this.suit=suit;
    this.value=value;
}
function Deck(){
    this.cards=[];
    this.suits=["Hearts","Diamonds","Clubs","Spades"];
    this.values=["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];
    for(let suit of this.suits){
        for(let value of this.values){
            this.cards.push(new Card(suit,value));
        }
    }
    this.shuffle=function(){
        for(let i=this.cards.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1));
            [this.cards[i],this.cards[j]]=[this.cards[j],this.cards[i]];
        }
    }
    this.deal=function(){
        let hand=[];
        for(let i=0;i<4;i++){
            hand.push(this.cards.pop());
        }
        return hand
    }
    this.draw=function(){
        return this.cards.pop();
    }
    this.discard=function(card){
        this.cards.push(card)
    }
}
let deck = new Deck();
deck.shuffle();
let player1 = {
  hand: deck.deal(),
  faceUpCards: [],
  faceDownCards: []
};
let player2 = {
  hand: deck.deal(),
  faceUpCards: [],
  faceDownCards: []
};
let discardPile = [deck.draw()];
let currentPlayer=player1;
printBoard();
askUserInput();
/*--------------------------------------------------------------------------------------------------------------------*/
// cli.js
const readline=require("readline");
let rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
function printBoard(){
  console.log(`Player 1 Hand: ${player1.hand.map(card => card.value).join(', ')}`);
  console.log(`Player 1 Face Up Cards: ${player1.faceUpCards.map(card => card.value).join(', ')}`);
  console.log(`Player 1 Face Down Cards: ${player1.faceDownCards.map(card => card.value).join(', ')}`);
  console.log(`Player 2 Hand: ${player2.hand.map(card => card.value).join(', ')}`);
  console.log(`Player 2 Face Up Cards: ${player2.faceUpCards.map(card => card.value).join(', ')}`);
  console.log(`Player 2 Face Down Cards: ${player2.faceDownCards.map(card => card.value).join(', ')}`);
  console.log(`Discard Pile: ${discardPile.map(card => card.value).join(', ')}`);
  console.log(`Current Player: ${currentPlayer}`);
}
function askUserInput(){
    rl.question(`what ur next step,${currentPlayer}?(draw, replace, discard, or end turn)`,(answer)=>{
        handleUserInput(answer);    
    });
}
function handleUserInput(input) {
    switch (input.trim().toLowerCase()) {
      case 'draw':
        // draw a card from the deck
        let drawnCard = deck.draw();
        console.log(`You drew a ${drawnCard.value} of ${drawnCard.suit}`);
        rl.question(`What would you like to do with the drawn card? (replace, discard, or end turn) `, (answer) => {
            handleUserInput(answer);
          });
          break;
          case 'replace':
            rl.question(`Which face down card would you like to replace? (1-${currentPlayer === 'player1' ? player1.faceDownCards.length : player2.faceDownCards.length}) `, (answer) => {
                let cardIndex = parseInt(answer) - 1;
                if (cardIndex >= 0 && cardIndex < (currentPlayer === 'player1' ? player1.faceDownCards.length : player2.faceDownCards.length)) {
                  if (currentPlayer === 'player1') {
                    player1.faceDownCards[cardIndex] = drawnCard;
                  } else {
                    player2.faceDownCards[cardIndex] = drawnCard;
                  }
                  console.log(`Replaced face down card ${cardIndex + 1} with ${drawnCard.value} of ${drawnCard.suit}`);
                  printBoard();
                  askUserInput();
                } else {
                  console.log('Invalid card index. Please try again.');
                  askUserInput();
                }
              });
              break;
              case 'discard':
                rl.question(`Which card would you like to discard? (1-${currentPlayer === 'player1' ? player1.hand.length : player2.hand.length}) `, (answer) => {
                    let cardIndex = parseInt(answer) - 1;
                    if (cardIndex >= 0 && cardIndex < (currentPlayer === 'player1' ? player1.hand.length : player2.hand.length)) {
                    let discardedCard = currentPlayer === 'player1' ? player1.hand.splice(cardIndex, 1)[0] : player2.hand.splice(cardIndex, 1)[0];
                    discardPile.push(discardedCard);
                    console.log(`Discarded ${discardedCard.value} of ${discardedCard.suit}`);
                    printBoard();
                    askUserInput();
                    } else {
                    console.log('Invalid card index. Please try again.');
                    askUserInput();
                    }
              });
              break;
        case 'end turn':
        // end the current player's turn
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        printBoard();
        askUserInput();
        break;
        default:
        console.log('Invalid input. Please try again.');
        askUserInput();
    }
}
printBoard();
askUserInput();
/*--------------------------------------------------------------------------------------------------------------------*/
// Initialize the player's score and hand
let playerScore = 0;
let playerHand = [];

// Function to calculate the score of a hand
function calculateScore(hand) {
  let score = 0;
  for (let i = 0; i < hand.length; i++) {
    let cardValue = getCardValue(hand[i].value);
    score += cardValue;
  }
  return score;
}
function getCardValue(cardValue) {
    switch (cardValue) {
      case 'Ace':
        return 1;
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
        return parseInt(cardValue);
      case 'Jack':
        return -1
      case 'Queen':
        return 12
      case 'King':
        return 13;
      default:
        return 0;
    }
  }

// Function to check for game over
function checkGameOver(hand) {
  let score = calculateScore(hand);
  if (score <= 10) {
    return true; // Game over, player has won
  } else {
    return false; // Game not over yet
  }
}

// Update the player's score and check for game over
function updateScoreAndCheckGameOver(hand) {
  playerScore = calculateScore(hand);
  if (checkGameOver(hand)) {
    console.log(`Game over! Your final score is ${playerScore}.`);
    // Game over logic here, e.g., display a winning message or restart the game
  }
}
/*--------------------------------------------------------------------------------------------------------------------*/
