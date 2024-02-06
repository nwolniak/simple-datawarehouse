package pl.edu.agh.simpledatawarehouse.model.metadata;

import lombok.Builder;

import java.util.List;

@Builder
public record Metadata(
        String database,
        String host,
        List<TableMetadata> tablesMetadata
) {
}
