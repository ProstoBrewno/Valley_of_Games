package com.websites.Valley_of_Games.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

//Класс отвечающий за все переходы на сайте
@Controller
public class MainController {

    @GetMapping("/")
    public String home (Model model) {
        //возвращаем определенный html шаблон
        model.addAttribute("title", "Главная страница");
        return "home";
    }

    @GetMapping("/auth")
    public String auth (Model model) {
        //возвращаем определенный html шаблон
        model.addAttribute("title", "Вход/Регистрация");
        return "auth";
    }

}
