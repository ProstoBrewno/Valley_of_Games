package com.websites.Valley_of_Games.controllers;


import com.websites.Valley_of_Games.models.Post;
import com.websites.Valley_of_Games.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RatingController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/rating")
    public String raiting (Model model) {
        Iterable<Post> posts = postRepository.findAll();
        model.addAttribute("posts", posts);
        return "rating";
    }

}
