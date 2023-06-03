package springpart.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springpart.backend.entity.UserEntity;
import springpart.backend.exception.PasswordIncorrectException;
import springpart.backend.exception.BadRegistrationDataException;
import springpart.backend.exception.UserDoesNotExistException;
import springpart.backend.exception.UserNotFoundException;
import springpart.backend.service.UserService;

@RestController
@RequestMapping("/")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity registration(@RequestBody UserEntity user) {
        try {
            userService.registration(user);
            return ResponseEntity.ok(true);
        } catch (BadRegistrationDataException e) {
            return ResponseEntity.ok(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка во время регистрации.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserEntity user) {
        try {
            userService.login(user);
            return ResponseEntity.ok(true);
        } catch (PasswordIncorrectException | UserDoesNotExistException e) {
            return ResponseEntity.ok("Введён неверный логин или пароль");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка во время входа в аккаунт.");
        }
    }

    @GetMapping
    public ResponseEntity getUserById(@RequestParam Long id) {
      try {
          return ResponseEntity.ok(userService.getUserById(id));
      } catch (UserNotFoundException e) {
          return ResponseEntity.badRequest().body(e.getMessage());
      } catch (Exception e) {
          return ResponseEntity.badRequest().body("не получилось достать пользователей.");
      }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка при удалении пользователя");
        }

    }
}
