const gameBoard = document.getElementById('game-board');
    const pacman = document.getElementById('pacman');
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.getElementById('start-btn');

    let score = 0;
    let dots = [];
    let ghosts = [];
    let gameInterval;
    let isGameRunning = false;
    let mouthOpen = true;

    // Анимация рта Пакмена
    function animatePacman() {
        if (!isGameRunning) return;

        mouthOpen = !mouthOpen;

        if (mouthOpen) {
            pacman.style.clipPath = 'polygon(50% 50%, 100% 0%, 100% 100%)';
        } else {
            pacman.style.clipPath = 'circle(50% at 50% 50%)';
        }

        setTimeout(animatePacman, 200);
    }

    // Создаем точки
    function createDots() {
        dots.forEach(dot => {
            if (dot.parentNode) {
                gameBoard.removeChild(dot);
            }
        });
        dots = [];

        for (let i = 0; i < 50; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';

            const x = Math.random() * (gameBoard.offsetWidth - 20) + 10;
            const y = Math.random() * (gameBoard.offsetHeight - 20) + 10;

            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;

            gameBoard.appendChild(dot);
            dots.push(dot);
        }
    }

    // Создаем призраков
    function createGhosts() {
        ghosts.forEach(ghost => {
            if (ghost.element.parentNode) {
                gameBoard.removeChild(ghost.element);
            }
        });
        ghosts = [];

        const ghostColors = ['red', 'pink', 'cyan', 'orange'];

        for (let i = 0; i < 4; i++) {
            const ghost = document.createElement('div');
            ghost.className = 'ghost';
            ghost.style.backgroundColor = ghostColors[i];

            // Добавляем глаза призраку
            const eyes = document.createElement('div');
            eyes.className = 'ghost-eyes';

            for (let j = 0; j < 2; j++) {
                const eye = document.createElement('div');
                eye.className = 'ghost-eye';

                const pupil = document.createElement('div');
                pupil.className = 'ghost-pupil';

                eye.appendChild(pupil);
                eyes.appendChild(eye);
            }

            ghost.appendChild(eyes);

            const positions = [
                { x: 30, y: 30 },
                { x: gameBoard.offsetWidth - 60, y: 30 },
                { x: 30, y: gameBoard.offsetHeight - 60 },
                { x: gameBoard.offsetWidth - 60, y: gameBoard.offsetHeight - 60 }
            ];

            ghost.style.left = `${positions[i].x}px`;
            ghost.style.top = `${positions[i].y}px`;

            gameBoard.appendChild(ghost);

            ghosts.push({
                element: ghost,
                x: positions[i].x,
                y: positions[i].y,
                dx: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
                dy: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
                changeDirectionTime: Date.now() + Math.random() * 2000 + 1000
            });
        }
    }

    // Обновляем позицию Пакмена
    function updatePacmanPosition(e) {
        if (!isGameRunning) return;

        const rect = gameBoard.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let x = mouseX - pacman.offsetWidth / 2;
        let y = mouseY - pacman.offsetHeight / 2;

        x = Math.max(0, Math.min(x, gameBoard.offsetWidth - pacman.offsetWidth));
        y = Math.max(0, Math.min(y, gameBoard.offsetHeight - pacman.offsetHeight));

        pacman.style.left = `${x}px`;
        pacman.style.top = `${y}px`;

        checkDotCollision(x, y);
    }

    // Проверяем столкновение с точками
    function checkDotCollision(pacmanX, pacmanY) {
        const pacmanRect = {
            x: pacmanX,
            y: pacmanY,
            width: pacman.offsetWidth,
            height: pacman.offsetHeight
        };

        dots.forEach((dot, index) => {
            if (!dot.parentNode) return;

            const dotRect = {
                x: parseFloat(dot.style.left),
                y: parseFloat(dot.style.top),
                width: dot.offsetWidth,
                height: dot.offsetHeight
            };

            if (isColliding(pacmanRect, dotRect)) {
                score += 10;
                scoreDisplay.textContent = `Очки: ${score}`;
                gameBoard.removeChild(dot);
                dots.splice(index, 1);

                if (dots.length === 0) {
                    createDots();
                }
            }
        });
    }

    // Проверяем столкновение с призраками
    function checkGhostCollision() {
        const pacmanRect = {
            x: parseFloat(pacman.style.left),
            y: parseFloat(pacman.style.top),
            width: pacman.offsetWidth,
            height: pacman.offsetHeight
        };

        for (const ghost of ghosts) {
            const ghostRect = {
                x: ghost.x,
                y: ghost.y,
                width: ghost.element.offsetWidth,
                height: ghost.element.offsetHeight
            };

            if (isColliding(pacmanRect, ghostRect)) {
                endGame();
                return;
            }
        }
    }

    // Проверка столкновения двух объектов
    function isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    // Обновляем позиции призраков
    function updateGhosts() {
        const now = Date.now();

        ghosts.forEach(ghost => {
            // Меняем направление через случайные интервалы
            if (now > ghost.changeDirectionTime) {
                ghost.dx = (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1);
                ghost.dy = (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1);
                ghost.changeDirectionTime = now + Math.random() * 2000 + 1000;
            }

            ghost.x += ghost.dx;
            ghost.y += ghost.dy;

            // Отскок от стен
            if (ghost.x <= 0 || ghost.x >= gameBoard.offsetWidth - ghost.element.offsetWidth) {
                ghost.dx *= -1;
            }
            if (ghost.y <= 0 || ghost.y >= gameBoard.offsetHeight - ghost.element.offsetHeight) {
                ghost.dy *= -1;
            }

            ghost.element.style.left = `${ghost.x}px`;
            ghost.element.style.top = `${ghost.y}px`;
        });
    }

    // Завершаем игру
    function endGame() {
        isGameRunning = false;
        clearInterval(gameInterval);
        alert(`Игра окончена! Ваш счет: ${score}`);
    }

    // Начинаем игру
    function startGame() {
        if (isGameRunning) return;

        score = 0;
        scoreDisplay.textContent = `Очки: 0`;

        createDots();
        createGhosts();

        pacman.style.left = `${gameBoard.offsetWidth / 2 - pacman.offsetWidth / 2}px`;
        pacman.style.top = `${gameBoard.offsetHeight / 2 - pacman.offsetHeight / 2}px`;
        pacman.style.clipPath = 'polygon(50% 50%, 100% 0%, 100% 100%)';

        isGameRunning = true;

        animatePacman();

        gameInterval = setInterval(() => {
            updateGhosts();
            checkGhostCollision();
        }, 30);
    }

    // Обработчики событий
    gameBoard.addEventListener('mousemove', updatePacmanPosition);
    startBtn.addEventListener('click', startGame);