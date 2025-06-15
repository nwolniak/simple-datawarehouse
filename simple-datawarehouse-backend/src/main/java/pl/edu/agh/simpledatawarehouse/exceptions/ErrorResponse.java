package pl.edu.agh.simpledatawarehouse.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@RequiredArgsConstructor
@Getter
@Setter
public class ErrorResponse {
    private final String message;
    private final String timestamp = Instant.now().toString();
}
