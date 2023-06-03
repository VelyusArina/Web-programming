package springpart.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springpart.backend.entity.PointContext;
import springpart.backend.exception.UserNotFoundException;
import springpart.backend.service.PointService;
import springpart.backend.service.UserService;


@RestController
@RequestMapping("/points")
@CrossOrigin
public class PointController {

    private final PointService pointService;
    private final UserService userService;

    public PointController(PointService pointService, UserService userService) {
        this.pointService = pointService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity getPoints() {
        try {
            return ResponseEntity.ok(pointService.getAllPoints());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Не удалось получить данные о точках.");
        }
    }

    @PostMapping
    public ResponseEntity addPoint(@RequestBody PointContext pointContext) {
        try {
            return ResponseEntity.ok(
                    pointService.addPoint(
                            pointContext.getPoint(),
                            userService.getUserByName(pointContext.getUsername())
                    )
            );
        }catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body("Пользователь с таким именем не зарегистрирован.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Во время добавления точки произошла ошибка.");
        }

    }

    @DeleteMapping
    public ResponseEntity clearAllPoints(@RequestBody String username) {
        try {
            pointService.clearPoints(userService.getUserByName(username));
            return ResponseEntity.ok("Таблица успешно очищена.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Не удалось очистить таблицу.");
        }
    }

    @GetMapping("/checkhit")
    public ResponseEntity checkHit(@RequestParam double r, @RequestParam double x, @RequestParam double y) {
        return ResponseEntity.ok(pointService.checkHit(r, x, y));
    }
}
