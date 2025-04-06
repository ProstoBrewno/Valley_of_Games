package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.GameScores;
import org.springframework.data.repository.CrudRepository;

public interface GameScoresRepository extends CrudRepository<GameScores, Long> {
}