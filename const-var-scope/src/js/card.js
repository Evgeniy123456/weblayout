export default class Card {
  _open = false
  _success = false

  constructor(container, number, action) {
    this.card = document.createElement('div')
    this.card.classList.add('hvr-grow-shadow', 'game__card')
    this.card.textContent = number
    this.number = number

    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        // this.card.classList.add('open')
        this.open = true
        action(this)
      }
    })
    container.append(this.card)
  }

  set open(value) {
      this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open')
  }

  get open() {
    return this._open
  }

  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }

  get success() {
    return this._open
  }
}

// let newCard = new Card(document.getElementById('game'), 7, flip)
// let newCard2 = new Card(document.getElementById('game'), 2, flip)
// let newCard3 = new Card(document.getElementById('game'), 12, flip)
// let newCard4 = new Card(document.getElementById('game'), 45, flip)
//  console.log(newCard);

// function flip(card) {
//   console.log(card);
// }
