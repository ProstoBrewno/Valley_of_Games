package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.Game;
import org.springframework.data.repository.CrudRepository;

/**
 * @brief Репозиторий для работы с сущностью игры.
 *
 * Интерфейс предоставляет базовые операции CRUD для работы с объектами типа {@link Game}.
 */
public interface GameRepository extends CrudRepository<Game, Long> {
}
