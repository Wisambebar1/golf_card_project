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
