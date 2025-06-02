package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.UserAchievement;
import org.springframework.data.repository.CrudRepository;

/**
 * @brief Репозиторий для работы с сущностью достижения пользователя.
 *
 * Интерфейс предоставляет базовые операции CRUD для работы с объектами типа {@link UserAchievement}.
 */
public interface UserAchievementRepository extends CrudRepository<UserAchievement, Long> {
}
