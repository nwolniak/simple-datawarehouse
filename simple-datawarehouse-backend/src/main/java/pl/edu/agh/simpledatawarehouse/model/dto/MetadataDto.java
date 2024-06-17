package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.*;
import pl.edu.agh.simpledatawarehouse.model.metadata.TableMetadata;

import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MetadataDto {
    private String database;
    private String host;
    private List<TableMetadata> tables;
    private List<TableMetadata> factTables;
    private Map<String, List<TableMetadata>> dimTables;
}
