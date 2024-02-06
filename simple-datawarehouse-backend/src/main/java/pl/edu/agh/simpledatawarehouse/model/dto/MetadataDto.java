package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.*;
import pl.edu.agh.simpledatawarehouse.model.metadata.TableMetadata;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MetadataDto {

    String database;
    String host;
    List<TableMetadata> tables;

}
