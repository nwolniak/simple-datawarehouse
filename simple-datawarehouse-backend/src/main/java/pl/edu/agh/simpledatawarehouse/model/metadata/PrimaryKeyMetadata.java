package pl.edu.agh.simpledatawarehouse.model.metadata;

import lombok.Builder;

@Builder
public record PrimaryKeyMetadata(
        String columnName,
        String primaryKeyName
) {
}
