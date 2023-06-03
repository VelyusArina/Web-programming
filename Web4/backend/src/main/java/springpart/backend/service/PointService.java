package springpart.backend.service;

import org.springframework.stereotype.Service;
import springpart.backend.entity.PointEntity;
import springpart.backend.entity.UserEntity;
import springpart.backend.DTO.Point;
import springpart.backend.repository.PointRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PointService {
    private final PointRepo pointRepo;

    public PointService(PointRepo pointRepo) {
        this.pointRepo = pointRepo;
    }

    public Point addPoint(PointEntity p, UserEntity user) {
        p.setDate(LocalDateTime.now());
        p.setHit(checkHit(p.getR(), p.getX(), p.getY()));
        p.setUser(user);
        pointRepo.save(p);
        return Point.toModel(p);
    }

    public List<Point> getAllPoints() {
        Iterable<PointEntity> entities = pointRepo.findAll();
        List<Point> points = new ArrayList<>();
        for (PointEntity entity : entities) {
            points.add(Point.toModel(entity));
        }
        return points;
    }

    public void clearPoints(UserEntity user) {
        pointRepo.deleteAll(pointRepo.findAllByUser(user));
    }

    public boolean checkHit(double r, double x, double y) {
        if (r < 0) {
            r = -r;
            x = -x;
            y = -y;
        }
        if (x >= 0 && y >= 0 && x * x + y * y <= r * r / 4)
            return true;
        if (x < 0 && y < 0)
            return false;
        if (x >= 0 && y <= 0 && 2 * y > x - r)
            return true;
        return -r <= x && x <= 0 && 0 <= y && y <= r;
    }
}
