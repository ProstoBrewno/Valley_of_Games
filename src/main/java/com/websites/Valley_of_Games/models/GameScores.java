package com.websites.Valley_of_Games.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * @brief Сущность, представляющая результаты игры пользователя.
 *
 * Хранит количество набранных очков, дату игры, а также ссылки на игру и пользователя.
 */
@Entity
public class GameScores {

    /** Уникальный идентификатор записи о результате игры. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Количество набранных очков в игре. */
    private int score;

    /** Дата и время, когда пользователь играл. */
    private LocalDateTime playedAt = LocalDateTime.now();

    /** Игра, в которой был получен результат. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    /** Пользователь, который получил результат. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * @brief Получить идентификатор результата игры.
     * @return Идентификатор результата.
     */
    public Long getId() {
        return id;
    }

    /**
     * @brief Установить идентификатор результата игры.
     * @param id Новый идентификатор.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @brief Получить количество набранных очков.
     * @return Набранные очки.
     */
    public int getScore() {
        return score;
    }

    /**
     * @brief Установить количество набранных очков.
     * @param score Новое количество очков.
     */
    public void setScore(int score) {
        this.score = score;
    }

    /**
     * @brief Получить дату и время игры.
     * @return Дата и время игры.
     */
    public LocalDateTime getPlayedAt() {
        return playedAt;
    }

    /**
     * @brief Установить дату и время игры.
     * @param playedAt Новая дата и время игры.
     */
    public void setPlayedAt(LocalDateTime playedAt) {
        this.playedAt = playedAt;
    }

    /**
     * @brief Получить игру, в которой был получен результат.
     * @return Игра.
     */
    public Game getGame() {
        return game;
    }

    /**
     * @brief Установить игру для результата.
     * @param game Игра.
     */
    public void setGame(Game game) {
        this.game = game;
    }

    /**
     * @brief Получить пользователя, который получил результат.
     * @return Пользователь.
     */
    public User getUser() {
        return user;
    }

    /**
     * @brief Установить пользователя для результата.
     * @param user Пользователь.
     */
    public void setUser(User user) {
        this.user = user;
    }
}
