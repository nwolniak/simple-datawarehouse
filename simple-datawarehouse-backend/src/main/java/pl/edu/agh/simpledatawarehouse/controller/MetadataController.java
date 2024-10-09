package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.simpledatawarehouse.model.dto.MetadataDto;
import pl.edu.agh.simpledatawarehouse.service.MetadataService;

@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class MetadataController {

    private final MetadataService metadataService;

    @GetMapping("metadata")
    public MetadataDto getMetadata() {
        return metadataService.getMetadata();
    }

}
