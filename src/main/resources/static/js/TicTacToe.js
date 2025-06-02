document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const messageEl = document.getElementById('message');
    const startBtn = document.getElementById('start-btn');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const drawScoreEl = document.getElementById('draw-score');

    let boardState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = false;
    let scores = { player: 0, computer: 0, draw: 0 };

    // Создаем игровое поле
    function createBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Начало новой игры
    function startNewGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        messageEl.textContent = 'Ваш ход';
        createBoard();

        // Если компьютер ходит первым (случайный выбор)
        if (Math.random() < 0.5) {
            currentPlayer = 'O';
            messageEl.textContent = 'Ход компьютера...';
            setTimeout(computerMove, 500);
        }
    }

    // Обработка клика по клетке
    function handleCellClick(e) {
        if (!gameActive) return;

        const index = parseInt(e.target.getAttribute('data-index'));

        if (boardState[index] !== '' || currentPlayer !== 'X') return;

        makeMove(index, 'X');

        if (checkWin('X')) {
            endGame('player');
            return;
        }

        if (isBoardFull()) {
            endGame('draw');
            return;
        }

        currentPlayer = 'O';
        messageEl.textContent = 'Ход компьютера...';
        setTimeout(computerMove, 500);
    }

    // Ход компьютера
    function computerMove() {
        if (!gameActive || currentPlayer !== 'O') return;

        // Простой ИИ: сначала проверяет возможность выиграть, затем блокирует игрока
        let move = findWinningMove('O') || findWinningMove('X') || findBestMove();

        makeMove(move, 'O');

        if (checkWin('O')) {
            endGame('computer');
            return;
        }

        if (isBoardFull()) {
            endGame('draw');
            return;
        }

        currentPlayer = 'X';
        messageEl.textContent = 'Ваш ход';
    }

    // Сделать ход
    function makeMove(index, player) {
        boardState[index] = player;
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        cell.style.cursor = 'default';
    }

    // Проверка на победу
    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // столбцы
            [0, 4, 8], [2, 4, 6]              // диагонали
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => boardState[index] === player);
        });
    }

    // Проверка на ничью
    function isBoardFull() {
        return boardState.every(cell => cell !== '');
    }

    // Завершение игры
    function endGame(winner) {
        gameActive = false;

        if (winner === 'player') {
            messageEl.textContent = 'Вы победили!';
            scores.player++;
            playerScoreEl.textContent = scores.player;
        } else if (winner === 'computer') {
            messageEl.textContent = 'Компьютер победил!';
            scores.computer++;
            computerScoreEl.textContent = scores.computer;
        } else {
            messageEl.textContent = 'Ничья!';
            scores.draw++;
            drawScoreEl.textContent = scores.draw;
        }
    }

    // Поиск выигрышного хода
    function findWinningMove(player) {
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = player;
                const isWin = checkWin(player);
                boardState[i] = '';
                if (isWin) return i;
            }
        }
        return null;
    }

    // Поиск лучшего хода (простая эвристика)
    function findBestMove() {
        // Центр - лучшая позиция
        if (boardState[4] === '') return 4;

        // Углы
        const corners = [0, 2, 6, 8];
        const emptyCorners = corners.filter(i => boardState[i] === '');
        if (emptyCorners.length > 0) {
            return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
        }

        // Стороны
        const sides = [1, 3, 5, 7];
        const emptySides = sides.filter(i => boardState[i] === '');
        if (emptySides.length > 0) {
            return emptySides[Math.floor(Math.random() * emptySides.length)];
        }

        // Если все заполнено (не должно происходить)
        return boardState.indexOf('');
    }

    // Обработчик кнопки "Новая игра"
    startBtn.addEventListener('click', startNewGame);

    // Инициализация игры
    createBoard();
    messageEl.textContent = 'Нажмите "Новая игра" чтобы начать';
});