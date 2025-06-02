package com.websites.Valley_of_Games.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * @brief Сущность, представляющая отзыв на игру.
 *
 * Содержит рейтинг, текст отзыва, дату создания, а также ссылки на игру и пользователя, который оставил отзыв.
 */
@Entity
@Table(name = "game_reviews")
public class GameReview {

    /** Уникальный идентификатор отзыва. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Оценка игры, выставленная пользователем. */
    @Column(nullable = false)
    private int rating;

    /** Текстовый отзыв пользователя об игре. */
    @Column(columnDefinition = "TEXT")
    private String review;

    /** Дата и время создания отзыва. */
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    /** Игра, к которой относится отзыв. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    /** Пользователь, который оставил отзыв. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * @brief Получить идентификатор отзыва.
     * @return Идентификатор отзыва.
     */
    public Long getId() {
        return id;
    }

    /**
     * @brief Установить идентификатор отзыва.
     * @param id Новый идентификатор отзыва.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @brief Получить рейтинг игры.
     * @return Рейтинг игры.
     */
    public int getRating() {
        return rating;
    }

    /**
     * @brief Установить рейтинг игры.
     * @param rating Новый рейтинг игры.
     */
    public void setRating(int rating) {
        this.rating = rating;
    }

    /**
     * @brief Получить текст отзыва.
     * @return Текст отзыва.
     */
    public String getReview() {
        return review;
    }

    /**
     * @brief Установить текст отзыва.
     * @param review Новый текст отзыва.
     */
    public void setReview(String review) {
        this.review = review;
    }

    /**
     * @brief Получить дату создания отзыва.
     * @return Дата создания отзыва.
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * @brief Установить дату создания отзыва.
     * @param createdAt Новая дата создания.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * @brief Получить игру, на которую оставлен отзыв.
     * @return Игра.
     */
    public Game getGame() {
        return game;
    }

    /**
     * @brief Установить игру для отзыва.
     * @param game Игра, на которую оставлен отзыв.
     */
    public void setGame(Game game) {
        this.game = game;
    }

    /**
     * @brief Получить пользователя, который оставил отзыв.
     * @return Пользователь.
     */
    public User getUser() {
        return user;
    }

    /**
     * @brief Установить пользователя для отзыва.
     * @param user Пользователь, который оставил отзыв.
     */
    public void setUser(User user) {
        this.user = user;
    }
}
