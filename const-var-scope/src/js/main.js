import Card from './card.js'

 function newGame(container, cardsCount) {

    let cardsNumberArray = [];
    let cardsArray = [];
    let firstCard = null;
    let secondCard = null;

    for (let i = 1; i <= cardsCount; i++) {
      cardsNumberArray.push(i, i)
      // cardsNumberArray.push(i, i)
    }

    cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5)

    for (const cardNumber of cardsNumberArray) {
      cardsArray.push(new Card(container, cardNumber, flip))
    }

    function flip(card) {
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number != secondCard.number) {
          firstCard.open = false
          secondCard.open = false
          firstCard = null
          secondCard = null
        }
      }

      if (firstCard == null) {
        firstCard = card
      } else {
        if (secondCard == null) {
          secondCard = card
        }
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number == secondCard.number) {
          firstCard.success = true
          secondCard.success = true
          firstCard = null
          secondCard = null
        }
      }
      function btnOpen() {
        document.getElementById('gameButton').style.display = 'block'
      }

      if (document.querySelectorAll('.game__card.success').length == cardsNumberArray.length) {
        setTimeout("alert('Невероятная победа')", 600);
        setTimeout(btnOpen, 2500);
      }

      let gameButton = document.getElementById('gameButton');
      gameButton.addEventListener('click', function() {
        container.innerHTML = ''
        cardsNumberArray = []
        cardsArray = []
        firstCard = null
        secondCard = null
        gameButton.style.display = 'none'
        newGame(container, cardsCount)
      } )
    }
  }

  newGame(document.getElementById('game'), 10)
