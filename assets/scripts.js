//Get all cards
//Get game countainer
const gameContainer = document.querySelector(".cards");
const numberOfCard = 8;
const emojis = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];
for (let i = 0; i < numberOfCard; i++) {
  gameContainer.innerHTML += `
    <div class="card-container">
      <div class="card front-card">
        ?
      </div>
      <div class="card back-card">
        ${emojis[i]}
      </div>
    </div>
  `;
  gameContainer.innerHTML += `
    <div class="card-container">
      <div class="card front-card">
        ?
      </div>
      <div class="card back-card">
      ${emojis[i]}
      </div>
    </div>
  `;
}
const cards = document.querySelectorAll(".card-container");

console.log(cards);
console.log(gameContainer);

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  console.log("flipping");
  console.log(this);
  //Thay đổi classList
  this.classList.toggle("flip");
}
