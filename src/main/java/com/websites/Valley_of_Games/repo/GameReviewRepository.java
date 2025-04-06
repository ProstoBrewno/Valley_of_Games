package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.GameReview;
import org.springframework.data.repository.CrudRepository;

public interface GameReviewRepository extends CrudRepository<GameReview, Long> {
}