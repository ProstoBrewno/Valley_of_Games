package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.GameReview;
import org.springframework.data.repository.CrudRepository;

/**
 * @brief Репозиторий для работы с сущностью обзора игры.
 *
 * Интерфейс предоставляет базовые операции CRUD для работы с объектами типа {@link GameReview}.
 */
public interface GameReviewRepository extends CrudRepository<GameReview, Long> {
}
