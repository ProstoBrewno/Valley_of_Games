package com.websites.Valley_of_Games.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

/**
 * @brief Сущность, представляющая игру в системе.
 *
 * Игра включает название, описание, жанр и дату создания.
 */
@Entity
public class Game {

    /** Уникальный идентификатор игры. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Название игры. */
    private String title;

    /** Описание игры. */
    private String description;

    /** Жанр игры. */
    private String genre;

    /** Дата и время создания записи об игре. */
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * @brief Получить дату и время создания игры.
     * @return Дата и время создания.
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * @brief Установить дату и время создания игры.
     * @param createdAt Новая дата и время создания.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * @brief Получить жанр игры.
     * @return Жанр игры.
     */
    public String getGenre() {
        return genre;
    }

    /**
     * @brief Установить жанр игры.
     * @param genre Новый жанр игры.
     */
    public void setGenre(String genre) {
        this.genre = genre;
    }

    /**
     * @brief Получить описание игры.
     * @return Описание игры.
     */
    public String getDescription() {
        return description;
    }

    /**
     * @brief Установить описание игры.
     * @param description Новое описание игры.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @brief Получить название игры.
     * @return Название игры.
     */
    public String getTitle() {
        return title;
    }

    /**
     * @brief Установить название игры.
     * @param title Новое название игры.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @brief Получить идентификатор игры.
     * @return Идентификатор игры.
     */
    public Long getId() {
        return id;
    }

    /**
     * @brief Установить идентификатор игры.
     * @param id Новый идентификатор игры.
     */
    public void setId(Long id) {
        this.id = id;
    }
}
