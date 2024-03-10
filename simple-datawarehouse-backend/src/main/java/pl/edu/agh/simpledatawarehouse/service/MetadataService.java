package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.MetaDataRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.MetadataDto;

@Service
@RequiredArgsConstructor
public class MetadataService {

    @Lazy
    private final MetaDataRepository metaDataRepository;

    public MetadataDto getMetadata() {
        var metadataDto = new MetadataDto();
        var metadata = metaDataRepository.getMetadata();
        metadataDto.setDatabase(metadata.database());
        metadataDto.setHost(metadata.host());
        metadataDto.setTables(metadata.tablesMetadata());
        return metadataDto;
    }

}
