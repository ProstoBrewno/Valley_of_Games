package com.websites.Valley_of_Games.controllers;

import com.websites.Valley_of_Games.models.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.websites.Valley_of_Games.models.Author;

import java.util.List;

/**
 * @brief Контроллер для обработки основных маршрутов сайта.
 *
 * Класс отвечает за отображение главной страницы и страницы авторизации/регистрации.
 */
@Controller
public class MainController {

    /**
     * @brief Обрабатывает запрос на главную страницу сайта.
     *
     * @param model Модель для передачи данных в шаблон.
     * @return Название HTML-шаблона для главной страницы ("home").
     */
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("title", "Главная страница");
        model.addAttribute("user", new User());
        List<Author> authors = List.of(
                new Author("Никита", "Разработка backend и базы данных", "author1.svg", "https://t.me/SpaceStd"),
                new Author("Алина", "Разработка дизайна и frontend", "author2.svg", "https://t.me/angelos_131")
        );

        model.addAttribute("authors", authors);
        return "index";
    }

    @GetMapping("/tictactoe")
    public String tictactoe(Model model) {
        model.addAttribute("title", "Игра Крестики-Нолики");
        // Здесь можно добавить любые другие атрибуты для страницы
        return "TicTacToe";
    }
    @GetMapping("/pacman")
    public String pacman(Model model) {
        model.addAttribute("title", "Игра Pac-Man");
        // Здесь можно добавить любые другие атрибуты для страницы
        return "PacMan";
    }

    @GetMapping("/tower")
    public String tower(Model model) {
        model.addAttribute("title", "Игра Построй башню");
        // Здесь можно добавить любые другие атрибуты для страницы
        return "TowerBloks";
    }

    @GetMapping("/mine")
    public String mine(Model model) {
        model.addAttribute("title", "Игра Сапер");
        // Здесь можно добавить любые другие атрибуты для страницы
        return "MineSweeper";
    }

    @GetMapping("/tetris")
    public String tetris(Model model) {
        model.addAttribute("title", "Игра Тетрис");
        // Здесь можно добавить любые другие атрибуты для страницы
        return "Tetris";
    }

}
