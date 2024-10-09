package pl.edu.agh.simpledatawarehouse.support;

import org.springframework.stereotype.Component;
import pl.edu.agh.simpledatawarehouse.model.metadata.*;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DatawarehouseMetadataExtractor implements MetadataExtractor {

    private final static Set<String> ADDITIVE_TYPES = Set.of("numeric", "int2", "int4", "int8");

    @Override
    public List<TableMetadata> extractFactTables(List<TableMetadata> tablesMetadata) {
        return tablesMetadata
                       .stream()
                       .filter(this::isFactTable)
                       .toList();
    }

    @Override
    public Map<String, List<TableMetadata>> extractDimTables(List<TableMetadata> tablesMetadata, List<TableMetadata> factTables) {
        return factTables.stream()
                         .collect(Collectors.toMap(TableMetadata::tableName,
                                                   factTable -> extractDimTable(tablesMetadata, factTable)
                         ));
    }

    private List<TableMetadata> extractDimTable(List<TableMetadata> tablesMetadata, TableMetadata factTable) {
        return tablesMetadata
                       .stream()
                       .filter(tableMetadata -> isDimTable(tableMetadata, factTable))
                       .toList();
    }

    private boolean isFactTable(TableMetadata tableMetadata) {
        Set<String> columns = tableMetadata.columnsMetadata()
                                           .stream()
                                           .map(ColumnMetadata::name)
                                           .collect(Collectors.toSet());
        Set<String> foreignKeys = tableMetadata.foreignKeysMetadata()
                                               .stream()
                                               .map(ForeignKeyMetadata::foreignKeyColumnName)
                                               .collect(Collectors.toSet());
        Set<String> primaryKeys = tableMetadata.primaryKeysMetadata()
                                               .stream()
                                               .map(PrimaryKeyMetadata::columnName)
                                               .collect(Collectors.toSet());

        if (primaryKeys.isEmpty() || foreignKeys.isEmpty()) {
            return false;
        }
        if (!primaryKeys.containsAll(foreignKeys)) {
            return false;
        }

        columns.removeAll(primaryKeys);

        List<ColumnMetadata> additiveColumns = tableMetadata.columnsMetadata()
                                                            .stream()
                                                            .filter(columnMetadata -> columns.contains(
                                                                    columnMetadata.name()))
                                                            .toList();

        return additiveColumns.stream()
                              .allMatch(columnMetadata -> ADDITIVE_TYPES.contains(columnMetadata.type()));
    }

    private boolean isDimTable(TableMetadata tableMetadata, TableMetadata factTable) {
        Set<String> dimTables = factTable.foreignKeysMetadata()
                                             .stream()
                                             .map(ForeignKeyMetadata::primaryKeyTableName)
                                             .collect(Collectors.toSet());

        if (!dimTables.contains(tableMetadata.tableName())) {
            return false;
        }

        Set<String> foreignKeys = tableMetadata.foreignKeysMetadata()
                                               .stream()
                                               .map(ForeignKeyMetadata::foreignKeyColumnName)
                                               .collect(Collectors.toSet());
        Set<String> primaryKeys = tableMetadata.primaryKeysMetadata()
                                               .stream()
                                               .map(PrimaryKeyMetadata::columnName)
                                               .collect(Collectors.toSet());

        return foreignKeys.isEmpty() && !primaryKeys.isEmpty();
    }

}
