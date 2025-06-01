package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @brief Репозиторий для работы с сущностью пользователя.
 *
 * Интерфейс предоставляет базовые операции CRUD для работы с объектами типа {@link User}.
 */
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
