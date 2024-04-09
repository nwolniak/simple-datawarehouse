package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.MetaDataRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.MetadataDto;
import pl.edu.agh.simpledatawarehouse.model.metadata.Metadata;
import pl.edu.agh.simpledatawarehouse.support.DatawarehouseChecker;

@Service
@RequiredArgsConstructor
public class MetadataService {

    private final DatawarehouseChecker datawarehouseChecker;

    @Lazy
    private final MetaDataRepository metaDataRepository;

    public MetadataDto getMetadata() {
        var metadataDto = new MetadataDto();
        var tablesMetadata = metaDataRepository.getTablesMetadata();
        var factTables = datawarehouseChecker.extractFactTables(tablesMetadata);
        var dimTables = datawarehouseChecker.extractDimTables(tablesMetadata, factTables);
        dimTables.forEach((k, v) -> System.out.println(k + " -> " + v));
        var metadata = Metadata.builder()
                               .database(metaDataRepository.getDatabase())
                               .host(metaDataRepository.getURL())
                               .tables(tablesMetadata)
                               .factTables(factTables)
                               .dimTables(dimTables)
                               .build();
        metadataDto.setDatabase(metadata.database());
        metadataDto.setHost(metadata.host());
        metadataDto.setTables(metadata.tables());
        metadataDto.setFactTables(metadata.factTables());
        metadataDto.setDimTables(metadata.dimTables());
        return metadataDto;
    }

}
