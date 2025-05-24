package pl.edu.agh.simpledatawarehouse.support;

import pl.edu.agh.simpledatawarehouse.model.metadata.TableMetadata;

import java.util.List;
import java.util.Map;

public interface MetadataExtractor {

    List<TableMetadata> extractFactTables(List<TableMetadata> tablesMetadata);

    Map<String, List<TableMetadata>> extractDimTables(List<TableMetadata> tablesMetadata,
                                                      List<TableMetadata> factTables);

    List<TableMetadata> markAggregateColumns(List<TableMetadata> factTables);
}
