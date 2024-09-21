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
let deck=new Deck();
deck.shuffle();
let player1={
    hand:deck.deal(),
    faceUpCards: [],
    faceDownCards: []
};
let player2={
    hand:deck.deal(),
    faceUpCards: [],
    faceDownCards: []
};
let discardPile=[deck.draw()];
/*--------------------------------------------------------------------------------------------------------------------*/
// cli.js
const readline=require("readline");
let rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let currentPlayer="player1"
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
      break;
        case 'discard':
        // discard a card from the hand
        // todo: implement card discard logic
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
