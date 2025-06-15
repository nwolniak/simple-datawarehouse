package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.simpledatawarehouse.model.dto.MetadataDto;
import pl.edu.agh.simpledatawarehouse.service.MetadataService;

@Slf4j
@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class MetadataController {

    private final MetadataService metadataService;

    @GetMapping("metadata")
    public ResponseEntity<MetadataDto> getMetadata() {
        var metadataDto = metadataService.getMetadata();
        return ResponseEntity.ok(metadataDto);
    }

}
