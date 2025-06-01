//package com.websites.Valley_of_Games.controllers;
//
//import com.websites.Valley_of_Games.models.*;
//import com.websites.Valley_of_Games.repo.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//
///**
// * @brief Контроллер для отображения страницы рейтинга.
// *
// * Отвечает за загрузку данных о пользователях, играх, очках, достижениях и отзывах для страницы рейтинга.
// */
//@Controller
//public class RatingController {
//
//    /** Репозиторий для работы с пользователями. */
//    @Autowired
//    private UserRepository userRepository;
//
//    /** Репозиторий для работы с играми. */
//    @Autowired
//    private GameRepository gameRepository;
//
//    /** Репозиторий для работы с очками игр. */
//    @Autowired
//    private GameScoresRepository gameScoresRepository;
//
//    /** Репозиторий для работы с достижениями. */
//    @Autowired
//    private AchievementRepository achievementRepository;
//
//    /** Репозиторий для работы с отзывами об играх. */
//    @Autowired
//    private GameReviewRepository gameReviewRepository;
//
//    /** Репозиторий для работы с достижениями пользователей. */
//    @Autowired
//    private UserAchievementRepository userAchievementRepository;
//
//    /**
//     * @brief Обрабатывает запрос на страницу рейтинга.
//     *
//     * Загружает данные из различных репозиториев и передаёт их в шаблон для отображения на странице рейтинга.
//     *
//     * @param model Модель для передачи данных в шаблон.
//     * @return Название HTML-шаблона для страницы рейтинга ("rating").
//     */
//    @GetMapping("/rating")
//    public String rating(Model model) {
//        Iterable<User> users = userRepository.findAll();
//        model.addAttribute("users", users);
//
//        Iterable<Game> games = gameRepository.findAll();
//        model.addAttribute("games", games);
//
//        Iterable<GameScores> gameScores = gameScoresRepository.findAll();
//        model.addAttribute("gameScores", gameScores);
//
//        Iterable<Achievement> achivements = achievementRepository.findAll();
//        model.addAttribute("achivements", achivements);
//
//        Iterable<GameReview> gameReviews = gameReviewRepository.findAll();
//        model.addAttribute("gameReviews", gameReviews);
//
//        Iterable<UserAchievement> userAchievements = userAchievementRepository.findAll();
//        model.addAttribute("userAchievement", userAchievements);
//
//        return "rating";
//    }
//}
