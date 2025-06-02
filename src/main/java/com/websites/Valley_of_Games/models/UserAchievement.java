package com.websites.Valley_of_Games.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * @brief Сущность, представляющая достижение, полученное пользователем.
 *
 * Связывает пользователя и достижение с датой получения.
 */
@Entity
@Table(name = "user_achievements")
public class UserAchievement {

    /** Уникальный идентификатор записи о достижении пользователя. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Дата и время получения достижения. */
    @Column(name = "unlocked_at")
    private LocalDateTime unlockedAt = LocalDateTime.now();

    /** Пользователь, который получил достижение. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /** Полученное достижение. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievement_id", nullable = false)
    private Achievement achievement;

    /**
     * @brief Получить идентификатор записи.
     * @return Идентификатор записи.
     */
    public Long getId() {
        return id;
    }

    /**
     * @brief Установить идентификатор записи.
     * @param id Новый идентификатор записи.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @brief Получить дату и время получения достижения.
     * @return Дата и время получения.
     */
    public LocalDateTime getUnlockedAt() {
        return unlockedAt;
    }

    /**
     * @brief Установить дату и время получения достижения.
     * @param unlockedAt Новая дата и время получения.
     */
    public void setUnlockedAt(LocalDateTime unlockedAt) {
        this.unlockedAt = unlockedAt;
    }

    /**
     * @brief Получить пользователя, получившего достижение.
     * @return Пользователь.
     */
    public User getUser() {
        return user;
    }

    /**
     * @brief Установить пользователя, получившего достижение.
     * @param user Новый пользователь.
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @brief Получить достижение.
     * @return Достижение.
     */
    public Achievement getAchievement() {
        return achievement;
    }

    /**
     * @brief Установить достижение.
     * @param achievement Новое достижение.
     */
    public void setAchievement(Achievement achievement) {
        this.achievement = achievement;
    }
}
