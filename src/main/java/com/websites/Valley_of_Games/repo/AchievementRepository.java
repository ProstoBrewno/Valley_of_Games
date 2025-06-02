package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.Achievement;
import org.springframework.data.repository.CrudRepository;

/**
 * @brief Репозиторий для работы с сущностью достижения.
 *
 * Интерфейс предоставляет базовые операции CRUD для работы с объектами типа {@link Achievement}.
 */
public interface AchievementRepository extends CrudRepository<Achievement, Long> {
}
