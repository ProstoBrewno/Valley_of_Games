package com.websites.Valley_of_Games;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @brief Главный класс приложения, запускающий Spring Boot приложение.
 *
 * Этот класс содержит метод {@link #main(String[])} для запуска Spring Boot приложения,
 * которое инициализирует весь контекст Spring и начинает работу веб-сервера.
 */
@SpringBootApplication
public class ValleyOfGamesApplication {

	/**
	 * @brief Точка входа в приложение.
	 *
	 * Запускает Spring Boot приложение, создавая контекст приложения и веб-сервер.
	 * @param args Аргументы командной строки, передаваемые в приложение.
	 */
	public static void main(String[] args) {
		SpringApplication.run(ValleyOfGamesApplication.class, args);
	}
}
