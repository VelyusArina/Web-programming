package springpart.backend.service;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springpart.backend.entity.UserEntity;
import springpart.backend.exception.BadRegistrationDataException;
import springpart.backend.exception.PasswordIncorrectException;
import springpart.backend.exception.UserDoesNotExistException;
import springpart.backend.exception.UserNotFoundException;
import springpart.backend.DTO.User;
import springpart.backend.repository.UserRepo;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public UserEntity registration(UserEntity user) throws BadRegistrationDataException {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            throw new BadRegistrationDataException("Пользователь с таким именем уже существует");
        } else if (user.getUsername().length() < 3) {
            throw new BadRegistrationDataException("Имя пользоватлея должно быть не менее 3-х символов");
        } else if (user.getPassword().length() < 3) {
            throw new BadRegistrationDataException("Пароль должен быть не меньше 3-х символов");
        }
        user.setPassword(getSHA256Hash(user.getPassword()));
        return userRepo.save(user);
    }

    public UserEntity login(UserEntity user) throws UserDoesNotExistException, PasswordIncorrectException {
        UserEntity u = userRepo.findByUsername(user.getUsername());
        if (u == null) {
            throw new UserDoesNotExistException("Не найден пользователь с таким именем.");
        }
        if (!u.getPassword().equals(getSHA256Hash(user.getPassword()))) {
            throw new PasswordIncorrectException("Неверный пароль.");
        }
        return u;
    }

    public User getUserById(Long id) throws UserNotFoundException {
        Optional<UserEntity> user = userRepo.findById(id);
        if (user.isPresent()) {
            return User.toModel(user.get());
        }
        throw new UserNotFoundException("Пользователь с таким id не найден");
    }

    public UserEntity getUserByName(String name) throws UserNotFoundException {
        UserEntity user = userRepo.findByUsername(name);
        if (user != null) {
            return user;
        }
        throw new UserNotFoundException("Пользователь с таким именем не найден");
    }

    public Long delete(Long id) {
        userRepo.deleteById(id);
        return id;
    }

    private String getSHA256Hash(String input) {
        return DigestUtils.sha256Hex(input);
    }
}
