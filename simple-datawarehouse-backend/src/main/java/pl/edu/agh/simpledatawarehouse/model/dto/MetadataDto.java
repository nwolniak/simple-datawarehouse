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

    String database;
    String host;
    List<TableMetadata> tables;
    List<TableMetadata> factTables;
    Map<String, List<TableMetadata>> dimTables;

}
