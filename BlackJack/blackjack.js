const cards = [
  {
    card: "Ace of ",
    value: 1,
    html: ""
  },
  {
    card: "2 of ",
    value: 2,
    html: ""
  },
  {
    card: "3 of ",
    value: 3,
    html: ""
  },
  {
    card: "4 of ",
    value: 4,
    html: ""
  },
  {
    card: "5 of ",
    value: 5,
    html: ""
  },
  {
    card: "6 of ",
    value: 6,
    html: ""
  },
  {
    card: "7 of ",
    value: 7,
    html: ""
  },
  {
    card: "8 of ",
    value: 8,
    html: ""
  },
  {
    card: "9 of ",
    value: 9,
    html: ""
  },
  {
    card: "10 of ",
    value: 10,
    html: ""
  },
  {
    card: "Jack of ",
    value: 10,
    html: ""
  },
  {
    card: "Queen of ",
    value: 10,
    html: ""
  },
  {
    card: "King of ",
    value: 10,
    html: ""
  }
];

const cardType = ["Spades", "Hearts", "Diamonds", "Clubs"];

let completeSetOfCards = [];
let unicodeSpades = 127137;
let unicodeHearts = 127153;
let unicodeDiamonds = 127169;
let unicodeClubs = 127185;
let stayed = false;
let deck = [];
let dealer = [];
let player = [];
let playerScore = 0;
let dealerScore = 0;
const outputArea = document.querySelector("#output-area");
const winnerArea = document.querySelector("#winner-area");
const newGameButton = document.querySelector("#new-game-button");
const hitButton = document.querySelector("#hit-button");
const stayButton = document.querySelector("#stay-button");


hideGameButtons = () => {
  newGameButton.style.display = "inline-block";
  hitButton.style.display = "none";
  stayButton.style.display = "none";
}

createDeck = () => {
  setCardProperty(0, unicodeSpades);
  setCardProperty(1, unicodeHearts);
  setCardProperty(2, unicodeDiamonds);
  setCardProperty(3, unicodeClubs);
};

setCardProperty = (index, uni) => {
  let counter = 1;
  cards.forEach(e => {
    if (counter === 12) {
      ++uni;
    }
    completeSetOfCards.push({
      card: e.card + cardType[index],
      value: e.value,
      html: "&#" + uni
    });
    uni++;
    counter++;
  });
};

createDeck();
console.log(completeSetOfCards)
shuffleDeck = () => {
  let tmpDeck = completeSetOfCards;
//Dubbla kort skapas?
  while (tmpDeck.length > 0) {
    let getCard = Math.ceil(Math.random() * tmpDeck.length - 1);
    let card = tmpDeck.splice(getCard, 1);
    deck.push(card);
  }
};

drawCard = () => {
  let draw = deck.shift();
  return draw;
};

calculateHand = cards => {
  let score = 0;
  let ace = cards.find(e => e[0].value == 1);

  cards.forEach(e => {
    score += e[0].value;

  });
  //Funkar nästan helt, lite justering behövs
  if (score + 10 <= 21 && ace !== undefined) {
    score += 10;
  }

  return score;
};

showHand = (hand, score) => {
  let cards = "";
  hand.forEach(e => {
    cards += `${e[0].html}`;
  });

  return `${cards} ${score}<br>`;
};

dealAnotherCard = hand => {
  hand.push(drawCard());
  return hand;
};

clearTable = () => {
  outputArea.innerHTML += "";
};

showHands = (stayed) => {

  let winner = "";
  playerScore = calculateHand(player);
  dealerScore = calculateHand(dealer);
  clearTable();
  outputArea.innerHTML = `${showHand(dealer, dealerScore)}
  ${showHand(player, playerScore)}`;
 
  if(playerScore > 21){
    stayed = true;
  }
  
  winner = determineWinner(stayed);
  winnerArea.innerHTML = `${winner}`;
  if (winner !== ""){
    hideGameButtons();
  }
};

dealInitialCards = () => {
  player.push(drawCard());
  player.push(drawCard());

  dealer.push(drawCard());
  dealer.push(drawCard());

  showHands();
  //showHand(); //Behövs denna?
};

hasBlackJack = (hand, score) => {
  if (hand.length === 2 && score === 21) {
    console.log("someone has blackjack!!!");
    return true;
  }
};

isBust = (score) => {
  if (score > 21) {
    return true;
  }
};

determineWinner = (stayed) => {
  const dealerWins = "Dealer wins!";
  const playerWins = "You win!";
  const draw = "Draw";

  let dealerBJ = hasBlackJack(dealer, dealerScore);
  let playerBJ = hasBlackJack(player, playerScore);
  let dealerBust = isBust(dealerScore);
  let playerBust = isBust(playerScore);


  if (stayed === true) {
    if(playerBust === true){
      console.log("player has over 21")
      return dealerWins;
    }else if (dealerBust === true){
      console.log("dealer has over 21")
      return playerWins;
    }else if (dealer.length === 5 && dealerScore <= 21){
      console.log("dealer has 5 cards AND score of 21 or less")
      return dealerWins;
    }else if (playerScore === dealerScore){
      console.log("match is draw")
      return draw;
    }else if (playerScore > dealerScore){
      console.log("player has higher score than dealer")
      return playerWins;
    }else if (dealerScore > playerScore){
      console.log("dealer has higher score than player")
      return dealerWins;
    }
  }
  else{
    if (dealerBJ === true && playerBJ === true){
      console.log("match is draw, 2 blackjacks")
      return draw;
    }
    else if (playerBJ === true){
      console.log("player wins for blackjack")
      return playerWins;
    }
    else if (dealerBJ === true){
      console.log("dealer wins for blackjack")
      return dealerWins;
    }
    
  }
  return "";
};

showGameButtons = () => {
  newGameButton.style.display = "none";
  hitButton.style.display = "inline-block";
  stayButton.style.display = "inline-block";
}


startNewGame = () => {
  showGameButtons();
  deck = [];
  player = [];
  dealer = [];

  winnerArea.innerHTML = "";
  createDeck();
  shuffleDeck();
  dealInitialCards();
};

newGameButton.addEventListener("click", e => {
  startNewGame();
});

hitButton.addEventListener("click", e => {
  dealAnotherCard(player);
  showHands();
});

stayButton.addEventListener("click", e => {
  hideGameButtons();
  console.log("saybutton clicked");
  


  while(dealerScore <= playerScore && playerScore <= 21 && dealerScore <= 21){
    if(dealerScore >= playerScore || dealerScore >= 18){
      return showHands(true)
    }
    dealer.push(drawCard())
    console.log("dealer is drawing a card");
    showHands(true);
  }

})


