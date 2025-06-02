document.addEventListener('DOMContentLoaded', () => {
    // Константы игры
    const COLS = 10;
    const ROWS = 20;
    const EMPTY = 'empty';

    // Элементы DOM
    const grid = document.getElementById('grid');
    const nextPieceGrid = document.getElementById('nextPieceGrid');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const linesElement = document.getElementById('lines');
    const gameOverElement = document.getElementById('gameOver');
    const restartButton = document.getElementById('restartButton');

    // Кнопки управления
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const rotateBtn = document.getElementById('rotateBtn');
    const downBtn = document.getElementById('downBtn');
    const dropBtn = document.getElementById('dropBtn');

    // Игровые переменные
    let board = createBoard();
    let currentPiece = null;
    let nextPiece = null;
    let score = 0;
    let level = 1;
    let lines = 0;
    let gameOver = false;
    let dropInterval;

    // Фигуры Тетриса
    const SHAPES = [
        { name: 'I', color: 'I', shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]] },
        { name: 'J', color: 'J', shape: [[1,0,0], [1,1,1], [0,0,0]] },
        { name: 'L', color: 'L', shape: [[0,0,1], [1,1,1], [0,0,0]] },
        { name: 'O', color: 'O', shape: [[1,1], [1,1]] },
        { name: 'S', color: 'S', shape: [[0,1,1], [1,1,0], [0,0,0]] },
        { name: 'T', color: 'T', shape: [[0,1,0], [1,1,1], [0,0,0]] },
        { name: 'Z', color: 'Z', shape: [[1,1,0], [0,1,1], [0,0,0]] }
    ];

    // Инициализация игры
    function init() {
        createGrid();
        createNextPieceGrid();
        resetGame();
        addEventListeners();
    }

    // Создание игрового поля
    function createBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(EMPTY));
    }

    // Создание сетки для отображения
    function createGrid() {
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                grid.appendChild(cell);
            }
        }
    }

    // Создание сетки для следующей фигуры
    function createNextPieceGrid() {
        nextPieceGrid.innerHTML = '';
        nextPieceGrid.style.gridTemplateColumns = `repeat(4, 1fr)`;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                nextPieceGrid.appendChild(cell);
            }
        }
    }

    // Сброс игры
    function resetGame() {
        board = createBoard();
        score = 0;
        level = 1;
        lines = 0;
        gameOver = false;

        updateScore();
        gameOverElement.classList.remove('active');

        // Создаем первую и следующую фигуры
        currentPiece = getRandomPiece();
        nextPiece = getRandomPiece();
        updateNextPieceDisplay();

        // Начинаем игровой цикл
        startGame();
    }

    // Начало игры
    function startGame() {
        clearInterval(dropInterval);
        dropInterval = setInterval(() => {
            if (!gameOver) {
                moveDown();
            }
        }, 1000 / level);
    }

    // Получение случайной фигуры
    function getRandomPiece() {
        const randomIndex = Math.floor(Math.random() * SHAPES.length);
        const shape = SHAPES[randomIndex];
        return {
            shape: shape.shape,
            color: shape.color,
            pos: {x: Math.floor(COLS / 2) - Math.floor(shape.shape[0].length / 2), y: 0}
        };
    }

    // Обновление отображения следующей фигуры
    function updateNextPieceDisplay() {
        // Очищаем сетку
        const cells = nextPieceGrid.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.className = 'cell';
        });

        // Отображаем следующую фигуру
        nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const cell = nextPieceGrid.querySelector(`[data-row="${y}"][data-col="${x}"]`);
                    if (cell) {
                        cell.classList.add('filled', nextPiece.color);
                    }
                }
            });
        });
    }

    // Отрисовка игрового поля
    function draw() {
        // Очищаем сетку
        const cells = grid.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.className = 'cell';
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            if (board[row][col] !== EMPTY) {
                cell.classList.add('filled', board[row][col]);
            }
        });

        // Отрисовываем текущую фигуру
        if (currentPiece) {
            currentPiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        const boardX = currentPiece.pos.x + x;
                        const boardY = currentPiece.pos.y + y;

                        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
                            const cell = grid.querySelector(`[data-row="${boardY}"][data-col="${boardX}"]`);
                            if (cell) {
                                cell.classList.add('filled', currentPiece.color);
                            }
                        }
                    }
                });
            });
        }
    }

    // Проверка столкновений
    function collision(x, y, piece) {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (!piece.shape[row][col]) continue;

                const newX = x + col;
                const newY = y + row;

                if (
                    newX < 0 ||
                    newX >= COLS ||
                    newY >= ROWS ||
                    (newY >= 0 && board[newY][newX] !== EMPTY)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    // Фиксация фигуры на поле
    function lockPiece() {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const boardY = currentPiece.pos.y + y;
                    const boardX = currentPiece.pos.x + x;

                    if (boardY >= 0) {
                        board[boardY][boardX] = currentPiece.color;
                    }
                }
            });
        });

        // Проверяем заполненные линии
        checkLines();

        // Создаем новую фигуру
        currentPiece = nextPiece;
        nextPiece = getRandomPiece();
        updateNextPieceDisplay();

        // Проверяем game over
        if (collision(currentPiece.pos.x, currentPiece.pos.y, currentPiece)) {
            gameOver = true;
            clearInterval(dropInterval);
            gameOverElement.classList.add('active');
        }
    }

    // Проверка заполненных линий
    function checkLines() {
        let linesCleared = 0;

        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row].every(cell => cell !== EMPTY)) {
                // Удаляем линию и добавляем новую пустую вверху
                board.splice(row, 1);
                board.unshift(Array(COLS).fill(EMPTY));
                linesCleared++;
                row++; // Проверяем эту же позицию снова, так как все сместилось вниз
            }
        }

        if (linesCleared > 0) {
            // Обновляем счет
            lines += linesCleared;
            score += calculateScore(linesCleared);

            // Увеличиваем уровень каждые 10 линий
            level = Math.floor(lines / 10) + 1;

            updateScore();

            // Увеличиваем скорость
            startGame();
        }
    }

    // Расчет очков
    function calculateScore(linesCleared) {
        switch (linesCleared) {
            case 1: return 100 * level;
            case 2: return 300 * level;
            case 3: return 500 * level;
            case 4: return 800 * level;
            default: return 0;
        }
    }

    // Обновление счета
    function updateScore() {
        scoreElement.textContent = score;
        levelElement.textContent = level;
        linesElement.textContent = lines;
    }

    // Движение влево
    function moveLeft() {
        if (!gameOver) {
            if (!collision(currentPiece.pos.x - 1, currentPiece.pos.y, currentPiece)) {
                currentPiece.pos.x--;
                draw();
            }
        }
    }

    // Движение вправо
    function moveRight() {
        if (!gameOver) {
            if (!collision(currentPiece.pos.x + 1, currentPiece.pos.y, currentPiece)) {
                currentPiece.pos.x++;
                draw();
            }
        }
    }

    // Движение вниз
    function moveDown() {
        if (!gameOver) {
            if (!collision(currentPiece.pos.x, currentPiece.pos.y + 1, currentPiece)) {
                currentPiece.pos.y++;
                draw();
            } else {
                lockPiece();
            }
        }
    }

    // Мгновенное падение
    function drop() {
        if (!gameOver) {
            while (!collision(currentPiece.pos.x, currentPiece.pos.y + 1, currentPiece)) {
                currentPiece.pos.y++;
            }
            draw();
            lockPiece();
        }
    }

    // Поворот фигуры
    function rotate() {
        if (!gameOver) {
            const rotated = [];
            const piece = currentPiece.shape;

            // Транспонируем матрицу
            for (let i = 0; i < piece[0].length; i++) {
                rotated.push([]);
                for (let j = piece.length - 1; j >= 0; j--) {
                    rotated[i].push(piece[j][i]);
                }
            }

            // Проверяем, возможен ли поворот
            const originalShape = currentPiece.shape;
            currentPiece.shape = rotated;

            if (collision(currentPiece.pos.x, currentPiece.pos.y, currentPiece)) {
                // Если нет, пробуем сдвинуть влево/вправо
                const kicks = [-1, 1, -2, 2];
                for (const kick of kicks) {
                    if (!collision(currentPiece.pos.x + kick, currentPiece.pos.y, currentPiece)) {
                        currentPiece.pos.x += kick;
                        draw();
                        return;
                    }
                }

                // Если не получается, возвращаем исходную форму
                currentPiece.shape = originalShape;
            }

            draw();
        }
    }

    // Обработчики событий
    function addEventListeners() {
        // Кнопки управления
        leftBtn.addEventListener('click', moveLeft);
        rightBtn.addEventListener('click', moveRight);
        downBtn.addEventListener('click', moveDown);
        rotateBtn.addEventListener('click', rotate);
        dropBtn.addEventListener('click', drop);
        restartButton.addEventListener('click', resetGame);

        // Клавиатура
        document.addEventListener('keydown', (e) => {
            if (gameOver) return;

            switch (e.key) {
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'ArrowDown':
                    moveDown();
                    break;
                case 'ArrowUp':
                    rotate();
                    break;
                case ' ':
                    drop();
                    break;
            }
        });
    }

    // Запуск игры
    init();
    draw();
});