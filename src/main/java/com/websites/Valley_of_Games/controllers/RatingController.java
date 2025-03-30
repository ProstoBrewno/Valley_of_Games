package com.websites.Valley_of_Games.controllers;


import com.websites.Valley_of_Games.models.Game;
import com.websites.Valley_of_Games.models.User;
import com.websites.Valley_of_Games.repo.GameRepository;
import com.websites.Valley_of_Games.repo.UserRepository;
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

    @GetMapping("/rating")
    public String raiting (Model model) {
        Iterable<User> users = userRepository.findAll();
        model.addAttribute("users", users);

        Iterable<Game> games = gameRepository.findAll();
        model.addAttribute("games", games);

        return "rating";
    }

}
