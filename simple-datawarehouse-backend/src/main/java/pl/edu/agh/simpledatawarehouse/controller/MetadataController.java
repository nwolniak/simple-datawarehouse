package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;
import pl.edu.agh.simpledatawarehouse.model.dto.MetadataDto;
import pl.edu.agh.simpledatawarehouse.events.DatabaseConnectionEvent;
import pl.edu.agh.simpledatawarehouse.service.MetadataService;

@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class MetadataController {

    private final MetadataService metadataService;
    private final ApplicationEventPublisher applicationEventPublisher;

    @PostMapping("connect")
    public ResponseEntity<String> connectToDatabase(@RequestBody ConnectionParametersDto connectionParametersDto) {
        var databaseConnectionEvent = new DatabaseConnectionEvent(connectionParametersDto);
        applicationEventPublisher.publishEvent(databaseConnectionEvent);
        return ResponseEntity.status(HttpStatus.OK)
                             .build();
    }

    @GetMapping("metadata")
    public MetadataDto getMetadata() {
        return metadataService.getMetadata();
    }

}
