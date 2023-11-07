const blackjackDeck = getDeck();

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(name, hand = [])
    {
        this.name = name;
        this.hand = hand;
    };

    drawCard()
    {
        const index = Math.floor(Math.random() * blackjackDeck.length);
        this.hand.push(blackjackDeck[index]);

        return this.hand;
    };
};

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Dealer John");
const player = new CardPlayer("Player Mike");

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (hand) => {
    let totalVal = 0;
    let itsSoft = false;
    //check if both cards are Ace or not
    const bothAce = hand.every((card) => card.displayVal === 'Ace');

    hand.forEach(element => {
        let tempVal = 0;
        if (bothAce === true)
        {
            if (element.displayVal === 'Ace')
            {
                tempVal = 1;
            }
            else
            {
                tempVal = element.val;
            }
            //console.log(tempVal);
            totalVal += tempVal;
            itsSoft = false;
        }
        else
        {
            //console.log(totalVal);
            totalVal += element.val;
            itsSoft = true;            
        }
    });

    //console.log(totalVal);

    const blackJackScore = {
        total: totalVal,
        isSoft: itsSoft
    }

    //onsole.log(blackJackScore);
    return blackJackScore;
}

//const res = calcPoints(dealer.hand)

// /**
//  * Determines whether the dealer should draw another card.
//  * If the dealer's hand is 16 points or less, the dealer must draw another card
//  * If the dealer's hand is exactly 17 points, and the dealer has an Ace valued at 11, the dealer must draw another card
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
    //console.log(dealerHand)

    dealerScore = calcPoints(dealerHand).total;
    if (dealerScore <= 16)
    {
        return true;
    }

    if (dealerScore === 17 && dealerHand.isSoft === true)
    {
        return true;
    }
    return false;
}

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
    let result = '';

    if (playerScore === dealerScore)
    {
        result = `It's a tie.`;
    }
    else if (playerScore <= dealerScore)
    {
        result = `playerScore: ${playerScore}, dealerScore: ${dealerScore} : dealer wins!`;
    }
    else
    {
        result = `playerScore: ${playerScore}, dealerScore: ${dealerScore} : player wins!`;
    }

    return result;
}

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
const getMessage = (count, dealerCard) => {
    return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
const showHand = (player) => {
   const displayHand = player.hand.map((card) => card.displayVal);
   console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

// /**
//  * Runs Blackjack Game
//  */
const startGame = function() {
   player.drawCard();
   dealer.drawCard();
   player.drawCard();
   dealer.drawCard();

   let playerScore = calcPoints(player.hand).total;
   showHand(player);

   if (playerScore === 21)
   {
        return 'You have 21 after drawing your first 2 cards - you win!';
    }
   while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    console.log(`total now: ${playerScore}`)
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    //console.log(`total after the draw: ${playerScore}`)
    showHand(player);
   }
   console.log(playerScore)
   if (playerScore > 21) {
     return 'You went over 21 - you lose!';
   }
   console.log(`Player stands at ${playerScore}`);

   let dealerScore = calcPoints(dealer.hand).total;
   //console.log(`Dealer initial score at ${dealerScore}`);
   if (dealerScore === 21)
   {
        return 'Dealer has 21 after drawing her first 2 cards - Dealer wins!';
    }

   while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
     dealer.drawCard();
     dealerScore = calcPoints(dealer.hand).total;
     showHand(dealer);
   }
   if (dealerScore > 21) {
     return 'Dealer went over 21 - you win!';
   }
   console.log(`Dealer stands at ${dealerScore}`);

   return determineWinner(playerScore, dealerScore);
}

console.log(startGame());
