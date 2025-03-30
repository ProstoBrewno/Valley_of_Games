package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long> {
}
