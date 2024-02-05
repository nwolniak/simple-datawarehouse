package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.MetaDataRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.MetadataDto;

@Service
@RequiredArgsConstructor
public class MetadataService {

    private final MetaDataRepository metaDataRepository;

    public MetadataDto getMetadata() {
        var metadataDto = new MetadataDto();
        metadataDto.setTables(metaDataRepository.getTables());
        return metadataDto;
    }

}
