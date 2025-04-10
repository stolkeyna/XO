//Wystawia potrzebne zmienne
const board = document.querySelector('#board');
let currentPlayer = "X";
let winningCombo = [0, 0, 0];
let gameBoard = ("", "", "", "", "", "", "", "", "");

//Tworzy pole gry
function createBoard() {
    for (let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}
//Handlowanie naciśnienia myszy
function handleCellClick(event) {
    const messageTur = document.querySelector('#message');
    console.log('Cell clicked:', event.target.dataset.index);
    event.target.textContent = currentPlayer;
    gameBoard[event.target.dataset.index] = currentPlayer;
    console.log(checkWin());
    if (checkWin()) {
        messageTur.textContent = `${currentPlayer} wygrał!`;
        console.log(`${currentPlayer} wygrał!`);
        drawWinningLine();
    } else {
    if(currentPlayer === "X") {
        currentPlayer = "O";
        messageTur.textContent = "Tura: O";
    } else {
        currentPlayer = "X";
        messageTur.textContent = "Tura: X";
    }
    event.target.removeEventListener('click', handleCellClick);
}
}

createBoard();
//Sprawdza czy gra była wygrana
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            winningCombo = condition;
            return true;
        }
    }
    return false;
    }

    //Przycisk resetowania gry
    const resetBtn = document.querySelector("#resetBtn");
    resetBtn.addEventListener("click", resetGame);
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X"
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) =>{
            cell.textContent = "";
            cell.addEventListener("click", handleCellClick);

        });
        const line = document.querySelector(".line");
        if (line) {
        line.remove();
        }
        document.getElementById("message").textContent = "Tura: X";

    }
    resetGame();

    //Funkcja dla przycisku który pokazuje kto to stwarzał
    const creditsBtn = document.querySelector('#creditsBtn');
    creditsBtn.addEventListener("click", showCredits);
    function showCredits() {
        const credits = "Jest stworzone przez Lysianą Mariię 1kl num.9";
        console.log(credits);
    }

    //Funkcja tworzy linie po wygraniu
    function drawWinningLine() {
        const line = document.createElement("div");
        line.classList.add("line");
        board.appendChild(line);

        const start = winningCombo[0];
        const end = winningCombo[2];

        console.log(winningCombo[0], winningCombo[1], winningCombo[2]);
        console.log(winningCombo);

        if (start === 0 && end === 2) {
            line.style.top = '50px';
            line.style.left = "0";
    } else if (start === 3 && end === 5) {
        line.style.top = '155px';
        line.style.left = '0';
    } else if (start === 6 && end === 8) {
        line.style.top = '260px';
        line.style.left = '0';
    } else if (start === 0 && end === 6) {
        line.style.width = '322px'
        line.style.top = '0'
        line.style.left = '55px'
        line.style.transform = 'rotate(90deg)';
    } else if (start === 1 && end === 7) {
        line.style.width = '322px'
        line.style.top = '0'
        line.style.left = '160px'
        line.style.transform = 'rotate(90deg)';
    } else if (start === 2 && end === 8) {
        line.style.width = '322px'
        line.style.top = '0'
        line.style.left = '265px'
        line.style.transform = 'rotate(90deg)';
    } else if (start === 0 && end === 8) {
        line.style.width = '444px'
        line.style.top = '0'
        line.style.left = '3px'
        line.style.transform = 'rotate(45.7deg)';
    } else if (start === 2 && end === 6) {
        line.style.width = '444px'
        line.style.top = '318px'
        line.style.left = '0'
        line.style.transform = 'rotate(-45.7deg)';
    }
}