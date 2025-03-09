package pl.edu.agh.simpledatawarehouse.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.agh.simpledatawarehouse.dao.MetaDataRepository;
import pl.edu.agh.simpledatawarehouse.support.MetadataExtractor;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class MetadataServiceTest {

    @InjectMocks
    private MetadataService metadataService;

    @Mock
    private MetaDataRepository metadataRepository;

    @Mock
    private MetadataExtractor metadataExtractor;

    @BeforeEach
    void setUp() {
        Mockito.doReturn("database").when(metadataRepository).getDatabase();
        Mockito.doReturn("urls").when(metadataRepository).getURL();
        Mockito.doReturn(List.of()).when(metadataRepository).getTablesMetadata();
        Mockito.doReturn(List.of()).when(metadataExtractor).extractFactTables(Mockito.anyList());
        Mockito.doReturn(Map.of()).when(metadataExtractor).extractDimTables(Mockito.anyList(), Mockito.anyList());
    }

    @Test
    void getMetadataSuccess() {
        var metadata = metadataService.getMetadata();

        assertThat(metadata).isNotNull();
        assertThat(metadata.getDatabase()).isEqualTo("database");
        assertThat(metadata.getHost()).isEqualTo("urls");
        assertThat(metadata.getTables()).isEqualTo(List.of());
        assertThat(metadata.getFactTables()).isEqualTo(List.of());
        assertThat(metadata.getDimTables()).isEqualTo(Map.of());
    }
}