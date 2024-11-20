package pl.edu.agh.simpledatawarehouse.model.metadata;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record Metadata(
        String database,
        String host,
        List<TableMetadata> tables,
        List<TableMetadata> factTables,
        Map<String, List<TableMetadata>> dimTables
) {
}
