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
