package com.websites.Valley_of_Games.models;

import jakarta.persistence.*;

/**
 * @brief Сущность, представляющая достижение в системе.
 *
 * Каждое достижение имеет название, описание и ссылку на иконку.
 */
@Entity
@Table(name = "achievements")
public class Achievement {

    /** Уникальный идентификатор достижения. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Название достижения. */
    @Column(nullable = false)
    private String name;

    /** Описание достижения. */
    @Column(columnDefinition = "TEXT")
    private String description;

    /** URL-адрес иконки достижения. */
    @Column(name = "icon_url")
    private String iconUrl;

    /**
     * @brief Получить идентификатор достижения.
     * @return Идентификатор достижения.
     */
    public Long getId() {
        return id;
    }

    /**
     * @brief Установить идентификатор достижения.
     * @param id Новый идентификатор.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @brief Получить название достижения.
     * @return Название достижения.
     */
    public String getName() {
        return name;
    }

    /**
     * @brief Установить название достижения.
     * @param name Новое название достижения.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @brief Получить описание достижения.
     * @return Описание достижения.
     */
    public String getDescription() {
        return description;
    }

    /**
     * @brief Установить описание достижения.
     * @param description Новое описание достижения.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @brief Получить URL иконки достижения.
     * @return URL иконки достижения.
     */
    public String getIconUrl() {
        return iconUrl;
    }

    /**
     * @brief Установить URL иконки достижения.
     * @param iconUrl Новый URL иконки.
     */
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
}
