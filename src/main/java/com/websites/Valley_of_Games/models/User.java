package com.websites.Valley_of_Games.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

/**
 * @brief Сущность, представляющая пользователя сайта.
 *
 * Содержит информацию о логине, email, пароле, статусе администратора и дате регистрации.
 */
@Entity
public class User {

    /** Уникальный идентификатор пользователя. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Имя пользователя (логин). */
    private String username;

    /** Адрес электронной почты пользователя. */
    private String email;

    /** Хэш пароля пользователя. */
    private String passwordHash;

    /** Флаг, определяющий является ли пользователь администратором. */
    private boolean isAdmin;

    /** Дата и время регистрации пользователя. */
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * @brief Получить идентификатор пользователя.
     * @return Идентификатор пользователя.
     */
    public Long getId() {
        return id;
    }

    /**
     * @brief Установить идентификатор пользователя.
     * @param id Новый идентификатор пользователя.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @brief Получить имя пользователя.
     * @return Имя пользователя.
     */
    public String getUsername() {
        return username;
    }

    /**
     * @brief Установить имя пользователя.
     * @param username Новое имя пользователя.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @brief Получить email пользователя.
     * @return Email пользователя.
     */
    public String getEmail() {
        return email;
    }

    /**
     * @brief Установить email пользователя.
     * @param email Новый email пользователя.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @brief Получить хэш пароля пользователя.
     * @return Хэш пароля.
     */
    public String getPasswordHash() {
        return passwordHash;
    }

    /**
     * @brief Установить хэш пароля пользователя.
     * @param passwordHash Новый хэш пароля.
     */
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    /**
     * @brief Проверить, является ли пользователь администратором.
     * @return true, если пользователь администратор, иначе false.
     */
    public boolean isAdmin() {
        return isAdmin;
    }

    /**
     * @brief Установить статус администратора для пользователя.
     * @param admin Новый статус администратора.
     */
    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    /**
     * @brief Получить дату и время регистрации пользователя.
     * @return Дата и время регистрации.
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * @brief Установить дату и время регистрации пользователя.
     * @param createdAt Новая дата и время регистрации.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
