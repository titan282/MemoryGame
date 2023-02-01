const selectors = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  start: document.querySelector(".start-button"),
  timer: document.querySelector(".timer"),
  moves: document.querySelector(".moves"),
};

const states = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};
const resetStates = () => {
  states.flippedCards = 0;
  states.totalFlips = 0;
  states.totalTime = 0;
  states.loop = null;
};
const genarateGame = () => {
  resetStates();
  const dimensions = selectors.board.getAttribute("data-dimension");
  const emojis = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];

  const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
  // const picks = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌"];
  const items = shuffle([...picks, ...picks]);
  const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
           ${items
             .map(
               (item) => `
               <div class="card">
                 <div class="card-front"></div>
                 <div class="card-back">${item}</div>
               </div>
             `
             )
             .join("")}
       </div>
    `;
  const paser = new DOMParser().parseFromString(cards, "text/html");
  selectors.board.replaceWith(paser.querySelector(".board"));
};

const pickRandom = (arrays, numbers) => {
  let cloneArrays = [...arrays];
  let randomArray = [];

  for (let i = 0; i < numbers; i++) {
    indexRandom = Math.floor(Math.random() * cloneArrays.length);
    randomArray.push(cloneArrays[indexRandom]);
    cloneArrays.splice(indexRandom, 1);
  }
  return randomArray;
};

const shuffle = (arrays) => {
  let lastIndex = arrays.length - 1;
  while (lastIndex > 0) {
    randomIndex = Math.floor(Math.random() * lastIndex);
    let temp = arrays[lastIndex];
    arrays[lastIndex] = arrays[randomIndex];
    arrays[randomIndex] = temp;
    lastIndex--;
  }
  return arrays;
};

const attachEventListeners = () => {
  document.addEventListener("click", (event) => {
    const eventTarget = event.target;
    const eventParent = eventTarget.parentElement;

    if (
      eventParent.className.includes("card") &&
      !eventParent.className.includes("flipped") &&
      states.gameStarted
    ) {
      flipCard(eventParent);
    } else if (eventTarget.className.includes("start-button")) {
      startGame();
    }
  });
};

const startGame = () => {
  states.gameStarted = true;
  selectors.start.classList.add("disabled");
  selectors.boardContainer.classList.remove("flipped");
  genarateGame();

  states.loop = setInterval(() => {
    states.totalTime++;

    selectors.moves.innerText = `${states.totalFlips} moves`;
    selectors.timer.innerText = `time: ${states.totalTime} sec`;
  }, 1000);
};
const stopGame = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("flipped");
    card.classList.remove("matched");
  });
  states.gameStarted = false;
  states.totalFlips = 0;
  states.totalTime = 0;
  selectors.boardContainer.classList.add("flipped");
  clearInterval(states.loop);
  selectors.start.classList.remove("disabled");
};
const flipCard = (card) => {
  states.flippedCards++;
  states.totalFlips++;

  if (states.flippedCards <= 2) {
    card.classList.add("flipped");
  }

  if (states.flippedCards === 2) {
    let flippedCards = document.querySelectorAll(".flipped:not(.matched)");

    if (flippedCards[0].innerText === flippedCards[1].innerText) {
      flippedCards[0].classList.add("matched");
      flippedCards[1].classList.add("matched");
    }

    setTimeout(() => flipBackCards(), 1000);

    if (!document.querySelectorAll(".card:not(.flipped)").length) {
      setTimeout(() => {
        stopGame();
      }, 1000);
    }
  }
};
const flipBackCards = () => {
  document
    .querySelectorAll(".flipped:not(.matched)")
    .forEach((card) => card.classList.remove("flipped"));
  states.flippedCards = 0;
};
attachEventListeners();
