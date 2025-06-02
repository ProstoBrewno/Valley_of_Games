document.addEventListener("DOMContentLoaded", function () {
  // ========== ОПТИМИЗИРОВАННЫЙ ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ ==========
  const themeToggle = document.getElementById("dn");
  const body = document.body;

  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem("darkTheme");
  if (savedTheme === "light") {
    themeToggle.checked = true;
    body.classList.add("light-theme");
  } else {
    body.classList.add("dark-theme");
  }

  // Оптимизированный обработчик переключения темы
  themeToggle.addEventListener("change", function () {
    // Используем requestAnimationFrame для плавного перехода
    requestAnimationFrame(() => {
      body.classList.toggle("light-theme");
      body.classList.toggle("dark-theme");
      localStorage.setItem("darkTheme", this.checked ? "light" : "dark");
    });
  });

  // ========== МОДАЛЬНЫЕ ОКНА ==========
  const libraryOverlay = document.querySelector(".library-overlay");
  const authorsOverlay = document.querySelector(".authors-overlay");
  const authOverlay = document.querySelector(".auth-overlay");
  const ratingOverlay = document.getElementById("modal-rating");
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");

  // Открытие модального окна библиотеки
  document.querySelector(".footer-line").addEventListener("click", function () {
    body.classList.add("library-open");
    libraryOverlay.style.display = "flex";
    footer.style.display = "none";
    header.style.display = "none";
    loadGames();
  });

  // Открытие модального окна "Об авторах"
  document
    .querySelector('.footer-icons.right img[alt="Информация"]')
    .addEventListener("click", function () {
      body.classList.add("authors-open");
      authorsOverlay.style.display = "flex";
      footer.style.display = "none";
      header.style.display = "none";
    });

  // Открытие модального окна рейтинга
  document.querySelector(".rating-btn").addEventListener("click", function () {
    body.classList.add("rating-open");
    ratingOverlay.style.display = "flex";
    footer.style.display = "none";
    header.style.display = "none";
  });

  // Открытие модального окна авторизации
  document.querySelector(".login-btn").addEventListener("click", function () {
    body.classList.add("auth-open");
    authOverlay.style.display = "flex";
    footer.style.display = "none";
    header.style.display = "none";
  });

  // Закрытие модальных окон
  function closeAllModals() {
    body.classList.remove(
      "library-open",
      "authors-open",
      "auth-open",
      "rating-open"
    );
    libraryOverlay.style.display = "none";
    authorsOverlay.style.display = "none";
    authOverlay.style.display = "none";
    ratingOverlay.style.display = "none";
    footer.style.display = "flex";
    header.style.display = "flex";
  }

  // Обработчики закрытия
  document
    .querySelector(".library-icon")
    .addEventListener("click", closeAllModals);
  document
    .querySelector(".authors-close")
    .addEventListener("click", closeAllModals);
  document
    .querySelector(".auth-close")
    .addEventListener("click", closeAllModals);
  document
    .querySelector(".rating-close")
    .addEventListener("click", closeAllModals);

  // Закрытие при клике вне контента (добавлено для ratingOverlay)
  libraryOverlay.addEventListener("click", function (e) {
    if (e.target === this) closeAllModals();
  });

  authorsOverlay.addEventListener("click", function (e) {
    if (e.target === this) closeAllModals();
  });

  authOverlay.addEventListener("click", function (e) {
    if (e.target === this) closeAllModals();
  });

  ratingOverlay.addEventListener("click", function (e) {
    if (e.target === this) closeAllModals();
  });
  // ========== ОБРАБОТЧИКИ КНОПОК "НАПИСАТЬ" ==========
  document.querySelectorAll(".author-button").forEach((button) => {
    button.addEventListener("click", function () {
      const telegramLink = this.getAttribute("alt");
      if (telegramLink) {
        window.open(telegramLink, "_blank");
      }
    });
  });

  // ========== ЗАГРУЗКА ИГР ==========
  function loadGames() {
    const gamesData = [
      {
        id: 1,
        title: "Крестики-нолики",
        description: "Простая игра, с целью собрать три в ряд",
        image: "game1.svg",
        link: "tictactoe"
      },
      {
        id: 2,
        title: "PAC-MAN",
        description: "Управляй персонажем и собирай точки",
        image: "game2.svg",
        link: "pacman"
      },
      {
        id: 3,
        title: "Построй башню",
        description: "Размещай блоки и не дай кораблю разбиться",
        image: "game3.svg",
        link: "tower"
      },
      {
        id: 4,
        title: "Сапер",
        description: "Открой все клетки на поле и избегай мин",
        image: "game4.svg",
        link: "mine"
      },
      {
        id: 5,
        title: "Тетрис",
        description: "Вращай и располагай падающие блоки на поле",
        image: "game5.svg",
        link: "tetris"
      },
    ];

    const carousel = document.querySelector(".games-carousel");
    carousel.innerHTML = ""; // Очищаем перед добавлением

    // Создаем карточки игр
    gamesData.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="game-image-container">
          <img src="images/${game.image}" alt="${game.title}" class="game-image">
        </div>
        <h3 class="game-title">${game.title}</h3>
        <p class="game-description">${game.description}</p>
        <a href="${game.link}" class="play-button-link">
          <button class="play-button">Играть</button>
        </a>
      `;
      carousel.appendChild(card);
    });

    // ========== ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ КОЛЕСИКОМ МЫШИ ==========
    let isScrolling = false;
    let scrollVelocity = 0;
    let scrollAnimationId = null;

    carousel.addEventListener("wheel", (e) => {
      e.preventDefault();

      // Увеличиваем скорость прокрутки
      scrollVelocity += e.deltaY * 0.5;

      // Если анимация еще не запущена, запускаем
      if (!isScrolling) {
        isScrolling = true;
        smoothHorizontalScroll();
      }
    });

    function smoothHorizontalScroll() {
      // Применяем инерцию
      scrollVelocity *= 0.92; // Коэффициент замедления

      // Применяем скорость к скроллу
      carousel.scrollLeft += scrollVelocity;

      // Если скорость еще достаточно большая, продолжаем анимацию
      if (Math.abs(scrollVelocity) > 0.5) {
        scrollAnimationId = requestAnimationFrame(smoothHorizontalScroll);
      } else {
        isScrolling = false;
        scrollVelocity = 0;
      }
    }

    // Останавливаем анимацию при взаимодействии
    carousel.addEventListener("mousedown", () => {
      if (scrollAnimationId) {
        cancelAnimationFrame(scrollAnimationId);
        isScrolling = false;
        scrollVelocity = 0;
      }
    });

    // Оптимизация производительности
    carousel.style.willChange = "scroll-position";
  }

  //Обработчик нажатия на эмоции
  const emotion = document.querySelector(".emotion");
  emotion.addEventListener("click", function () {
    window.location.href = "emotion.html";
  });
});
