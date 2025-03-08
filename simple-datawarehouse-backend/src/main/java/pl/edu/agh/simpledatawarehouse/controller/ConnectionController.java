package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;
import pl.edu.agh.simpledatawarehouse.service.ConnectionService;

@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;

    @PostMapping("connect")
    public ResponseEntity<String> connectToDatabase(@RequestBody ConnectionParametersDto connectionParametersDto) {
        try {
            connectionService.tryConnectToDatabase(connectionParametersDto);
            return ResponseEntity
                    .ok()
                    .build();
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }

}
