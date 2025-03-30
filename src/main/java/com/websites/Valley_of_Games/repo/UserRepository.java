package com.websites.Valley_of_Games.repo;

import com.websites.Valley_of_Games.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
