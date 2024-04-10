package pl.edu.agh.simpledatawarehouse.model.etl;

import lombok.*;
import pl.edu.agh.simpledatawarehouse.model.metadata.Metadata;

import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EtlMapping {

    List<Metadata> factTables;
    List<Metadata> dimTables;

    Map<String, String> mappings;

}
