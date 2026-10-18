const words = {
  Animals: ["elephant", "giraffe", "penguin", "dolphin", "kangaroo"],
  Countries: ["canada", "brazil", "japan", "egypt", "australia"],
  Fruits: ["banana", "orange", "mango", "pineapple", "strawberry"],
  Programming: ["javascript", "python", "react", "github", "firebase"]
};

let selectedWord = "";
let selectedCategory = "";
let guessedLetters = [];
let wrongGuesses = 0;
let wins = 0;
const maxWrong = 6;

const categoryEl = document.getElementById('category');
const wordDisplayEl = document.getElementById('word-display');
const lettersEl = document.getElementById('letters');
const messageEl = document.getElementById('message');
const winsEl = document.getElementById('wins');
const newGameBtn = document.getElementById('new-game');
const parts = document.querySelectorAll('.part');

function initGame() {
  guessedLetters = [];
  wrongGuesses = 0;
  messageEl.textContent = "";

  const categories = Object.keys(words);
  selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryWords = words[selectedCategory];
  selectedWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];

  categoryEl.textContent = selectedCategory;
  displayWord();
  createLetters();
  resetHangman();
}

function displayWord() {
  wordDisplayEl.innerHTML = selectedWord.split('').map(letter =>
    `<span>${guessedLetters.includes(letter)? letter : ''}</span>`
  ).join('');

  if (!wordDisplayEl.textContent.includes('_') && wordDisplayEl.textContent.length > 0) {
    messageEl.textContent = "🎉 You Win!";
    messageEl.style.color = "#4ECB4E";
    wins++;
    winsEl.textContent = wins;
    disableLetters();
  }
}

function createLetters() {
  lettersEl.innerHTML = "";
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.addEventListener('click', () => handleGuess(letter, btn));
    lettersEl.appendChild(btn);
  });
}

function handleGuess(letter, btn) {
  guessedLetters.push(letter);
  btn.disabled = true;

  if (selectedWord.includes(letter)) {
    btn.classList.add('correct');
    displayWord();
  } else {
    btn.classList.add('wrong');
    wrongGuesses++;
    parts[wrongGuesses - 1].classList.add('show');

    if (wrongGuesses === maxWrong) {
      messageEl.textContent = `💀 Game Over! Word: ${selectedWord}`;
      messageEl.style.color = "#FF6B6B";
      disableLetters();
    }
  }
}

function disableLetters() {
  document.querySelectorAll('.letters button').forEach(btn => btn.disabled = true);
}

function resetHangman() {
  parts.forEach(part => part.classList.remove('show'));
}

newGameBtn.addEventListener('click', initGame);

// Start game
initGame();





