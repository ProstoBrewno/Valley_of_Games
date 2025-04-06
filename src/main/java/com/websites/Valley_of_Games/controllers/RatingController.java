package com.websites.Valley_of_Games.controllers;

import com.websites.Valley_of_Games.models.*;
import com.websites.Valley_of_Games.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RatingController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private GameScoresRepository gameScoresRepository;
    @Autowired
    private AchievementRepository achievementRepository;
    @Autowired
    private GameReviewRepository gameReviewRepository;
    @Autowired
    private UserAchievementRepository userAchievementRepository;

    @GetMapping("/rating")
    public String rating(Model model) {
        Iterable<User> users = userRepository.findAll();
        model.addAttribute("users", users);

        Iterable<Game> games = gameRepository.findAll();
        model.addAttribute("games", games);

        Iterable<GameScores> gameScores = gameScoresRepository.findAll();
        model.addAttribute("gameScores", gameScores);

        Iterable<Achievement> achivements = achievementRepository.findAll();
        model.addAttribute("achivements", achivements);

        Iterable<GameReview> gameReviews = gameReviewRepository.findAll();
        model.addAttribute("gameReviews" , gameReviews);

        Iterable<UserAchievement> userAchievements = userAchievementRepository.findAll();
        model.addAttribute("userAchievement", userAchievements);

        return "rating";


    }
}