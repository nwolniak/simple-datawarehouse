package pl.edu.agh.simpledatawarehouse.model.metadata;

import lombok.Builder;

import java.util.List;

@Builder
public record TableMetadata(
        String tableName,
        List<ColumnMetadata> columnsMetadata,
        List<PrimaryKeyMetadata> primaryKeysMetadata,
        List<ForeignKeyMetadata> foreignKeysMetadata
) {
}
