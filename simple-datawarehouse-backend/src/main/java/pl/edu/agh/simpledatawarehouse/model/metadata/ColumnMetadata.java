package pl.edu.agh.simpledatawarehouse.model.metadata;

import lombok.Builder;

@Builder
public record ColumnMetadata(
        String name,
        String size,
        String type,
        boolean isNullable,
        boolean isAutoincrement,
        boolean isAggregate
) {
}
