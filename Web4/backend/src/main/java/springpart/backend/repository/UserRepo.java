package springpart.backend.repository;

import org.springframework.data.repository.CrudRepository;
import springpart.backend.entity.UserEntity;

public interface UserRepo extends CrudRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
