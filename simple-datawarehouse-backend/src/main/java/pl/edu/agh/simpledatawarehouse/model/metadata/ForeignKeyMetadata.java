package pl.edu.agh.simpledatawarehouse.model.metadata;

import lombok.Builder;

@Builder
public record ForeignKeyMetadata(
        String primaryKeyTableName,
        String primaryKeyColumnName,
        String foreignKeyTableName,
        String foreignKeyColumnName
) {
}
