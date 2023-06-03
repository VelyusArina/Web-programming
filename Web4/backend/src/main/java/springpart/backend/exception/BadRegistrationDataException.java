package springpart.backend.exception;

public class BadRegistrationDataException extends Exception{
    public BadRegistrationDataException(String message) {
        super(message);
    }
}
