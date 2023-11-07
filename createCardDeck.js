/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const deck = new Array()
  const suits = ['hearts', 'spades', 'clubs', 'diamonds']

  for (let index = 0; index < suits.length; index++) 
  {
    // create an array of 13 objects
    for (let j = 1; j <= 13; j++) 
    {
      // for each loop, push a card object to the deck

      // special cases for when j > 10
      let displayVal = ''

      switch (j) 
      {
        case 1:
          displayVal = 'Ace'
          break
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          displayVal = `${j}`
          break
        case 11:
          displayVal = 'Jack'
          break
        case 12:
          displayVal = 'Queen'
          break
        case 13:
          displayVal = 'King'
          break
      }

      const card = {
        val: j,
        displayVal: displayVal,
        suit: suits[index],
      }

      switch (displayVal) {
        case 'Jack':
        case 'Queen':
        case 'King':
          card.val = 10
          break

        case 'Ace':
          card.val = 11
          break
      }

      deck.push(card)
      //console.log(deck)
    }
  }
  return deck;
}

// CHECKS
const deck = getDeck()

console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)

let hand = [];
const index = Math.floor(Math.random() * deck.length);
hand = deck[index];

console.log(hand)