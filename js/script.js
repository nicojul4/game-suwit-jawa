// --- DOM Element Selection ---
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultTextEl = document.querySelector(".result-text");
const playerChoices = document.querySelectorAll(".choice");
const computerChoiceImgEl = document.getElementById("computer-choice-img");
const resetButton = document.getElementById("reset-button");

// --- Game Variables ---
let playerScore = 0;
let computerScore = 0;
const choices = ["gajah", "orang", "semut"];

// --- Functions ---

// Fungsi untuk mendapatkan pilihan acak dari komputer
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Fungsi untuk menentukan pemenang
function getWinner(player, computer) {
  if (player === computer) {
    return "SERI!";
  } else if (
    (player === "gajah" && computer === "orang") ||
    (player === "orang" && computer === "semut") ||
    (player === "semut" && computer === "gajah")
  ) {
    return "KAMU MENANG!";
  } else {
    return "KAMU KALAH!";
  }
}

// Fungsi untuk mengupdate skor dan tampilan
function updateScore(winner) {
  resultTextEl.classList.remove("win", "lose", "draw"); // Hapus kelas sebelumnya

  if (winner === "KAMU MENANG!") {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultTextEl.textContent = winner;
    resultTextEl.classList.add("win");
  } else if (winner === "KAMU KALAH!") {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    resultTextEl.textContent = winner;
    resultTextEl.classList.add("lose");
  } else {
    resultTextEl.textContent = "SERI!";
    resultTextEl.classList.add("draw");
  }
}

// Fungsi untuk menampilkan pilihan komputer
function displayComputerChoice(computerChoice) {
  computerChoiceImgEl.src = `img/${computerChoice}.jpg`;
  computerChoiceImgEl.alt = computerChoice;
}

// Fungsi utama permainan yang dijalankan saat pemain memilih
function playGame(playerChoice) {
  // 1. Dapatkan pilihan komputer
  const computerChoice = getComputerChoice();

  // 2. Tentukan pemenang
  const winner = getWinner(playerChoice, computerChoice);

  // 3. Update skor dan hasil
  updateScore(winner);

  // 4. Tampilkan pilihan komputer
  displayComputerChoice(computerChoice);

  // 5. Beri highlight pada pilihan pemain
  playerChoices.forEach((choice) => {
    choice.classList.remove("selected");
    if (choice.dataset.choice === playerChoice) {
      choice.classList.add("selected");
    }
  });
}

// Fungsi untuk mereset permainan
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  resultTextEl.textContent = "Mulai permainan dengan memilih salah satu!";
  resultTextEl.classList.remove("win", "lose", "draw");
  computerChoiceImgEl.src = "img/question.jpg";
  computerChoiceImgEl.alt = "Tanda Tanya";
  playerChoices.forEach((choice) => choice.classList.remove("selected"));
}

// --- Event Listeners ---

// Tambahkan event listener untuk setiap pilihan pemain
playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.dataset.choice;
    playGame(playerChoice);
  });
});

// Tambahkan event listener untuk tombol reset
resetButton.addEventListener("click", resetGame);
