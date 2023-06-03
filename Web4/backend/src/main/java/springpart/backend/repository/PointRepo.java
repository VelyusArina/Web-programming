package springpart.backend.repository;

import org.springframework.data.repository.CrudRepository;
import springpart.backend.entity.PointEntity;
import springpart.backend.entity.UserEntity;

import java.util.ArrayList;

public interface PointRepo extends CrudRepository<PointEntity, Long> {
    ArrayList<PointEntity> findAllByUser(UserEntity user);
}
