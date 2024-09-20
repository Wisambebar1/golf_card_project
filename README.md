# golf card game project
the purpose of this weekend assignment is to program a game via oop programming in javascript language.
# rules of game
1.the purpose of the game is to finish with minimum number of points.
2.till 9 rounds all players must flip their cards.
3.before starting the game you must shuffle the cards.
4.each player will get 4 cards, 2 players total.
5.all cards must start face down.
6.top card from pile stock is discarded and put face up to start a discarded pile.
7.the two players must flip the first card in their 4 card row.
8.draw from stock pile or discarded pile.
9.you must replace the card drawn with 1 of 4 player's card each player.
10.move discarded card to discarded pile.
11.you can discard an unknow card card from stock pile after looking but discarded card that is drawn from discarded pile must be used and in its stead discard 1 of the 4 cards from the player.
# type of suits
clubs,hearts,spades,diamonds
# values
ace=1,numbers from 2 to 10 is equal  to the face number (2 card = 2) except 7 which is equal to 0, jack=-1, queen=12,
king=13, every exact pair of cards is equal to 0.
# steps
step 1:Create a new repository and set up the project structure,create a new js file and a readme.md.
step 2:implement game logic,create a deck constructor function,same for card.
in addition we will be implementing the following methods:shuffle,deal,draw,discard, we will use loop to handle
player turns.