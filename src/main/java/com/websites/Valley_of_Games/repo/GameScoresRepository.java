package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.GameScores;
import org.springframework.data.repository.CrudRepository;

/**
 * @brief Репозиторий для работы с сущностью оценки игры.
 *
 * Интерфейс предоставляет базовые операции CRUD для работы с объектами типа {@link GameScores}.
 */
public interface GameScoresRepository extends CrudRepository<GameScores, Long> {
}
