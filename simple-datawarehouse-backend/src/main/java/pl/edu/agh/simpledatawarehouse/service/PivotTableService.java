package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.model.dto.PivotTableQuery;
import pl.edu.agh.simpledatawarehouse.model.dto.PivotTableResult;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryResult;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class PivotTableService {

    private final QueryService queryService;

    public PivotTableResult getPivotTable(PivotTableQuery pivotTableQuery) {
        log.info(pivotTableQuery.toString());
        QueryResult queryResult = queryService.executeQuery(pivotTableQuery.query());
        var combinedRowList = combineRows(pivotTableQuery, queryResult.rowList());
        var rowRepresentation = rowRepresentation(combinedRowList);
        var rowLabelCountMap = countRowLabelSizes(combinedRowList);
        var columnLabelCountList = countColumnLabelSizes(combinedRowList);
//        var rowRepresentationWithoutDuplicated = removeDuplicateRowLabels(rowRepresentation, rowLabelCountMap);

        return PivotTableResult.builder()
                .rowLabelList(pivotTableQuery.rowLabels())
                .rowLabelMap(rowLabelCountMap)
                .columnLabelList(columnLabelCountList)
                .rowList(rowRepresentation)
                .build();
    }

    private List<Map<String, Object>> removeDuplicateRowLabels(
            List<Map<String, Object>> rowRepresentation,
            Map<String, Long> rowLabelCountMap) {
        var rowLabelsTaken = rowLabelCountMap.keySet()
                .stream()
                .collect(Collectors.toMap(key -> key, key -> false));
        return rowRepresentation.stream()
                .peek(row ->
                        rowLabelsTaken.entrySet()
                                .stream()
                                .filter(Map.Entry::getValue)
                                .forEach(entry -> {
                                    var rowKey = entry.getKey().substring(0, entry.getKey().lastIndexOf("="));
                                    row.remove(rowKey, entry.getKey().substring(entry.getKey().lastIndexOf("=") + 1));
                                }))
                .peek(row -> row.keySet()
                        .forEach(key -> {
                            var keyValue = key + "=" + row.get(key);
                            rowLabelsTaken.computeIfPresent(keyValue, (k, v) -> true);
                        }))
                .toList();
    }

    private List<CombinedRow> combineRows(final PivotTableQuery pivotTableQuery, final List<Map<String, Object>> data) {
        Map<GroupedByRowLabel, Map<GroupedByColumnLabel, List<ValueRecord>>> grouped = data.stream()
                .collect(
                        Collectors.groupingBy(
                                row -> groupByRowLabel(row, pivotTableQuery.rowLabels()),
                                LinkedHashMap::new,
                                Collectors.groupingBy(
                                        row -> groupByColumnLabel(row, pivotTableQuery.columnLabels()),
                                        LinkedHashMap::new,
                                        Collectors.collectingAndThen(
                                                Collectors.toList(),
                                                groupedRowList -> extractValueRecords(groupedRowList, pivotTableQuery.valueLabels()))
                                )
                        )
                );
        return grouped.entrySet()
                .stream()
                .map(this::combineRow)
                .toList();
    }

    private GroupedByRowLabel groupByRowLabel(Map<String, Object> row, List<String> rowLabels) {
        return new GroupedByRowLabel(rowLabels.stream().collect(Collectors.toMap(
                key -> key,
                row::get,
                (o, o2) -> o,
                LinkedHashMap::new
        )));
    }

    private GroupedByColumnLabel groupByColumnLabel(Map<String, Object> row, List<String> columnLabels) {
        return new GroupedByColumnLabel(columnLabels.stream().collect(Collectors.toMap(
                key -> key,
                row::get,
                (o, o2) -> o,
                LinkedHashMap::new
        )));
    }

    private List<ValueRecord> extractValueRecords(List<Map<String, Object>> rowList, List<String> valueLabels) {
        return valueLabels.stream()
                .map(valueLabel -> new ValueRecord(valueLabel, aggregateValue(rowList, valueLabel)))
                .toList();
    }

    private Double aggregateValue(List<Map<String, Object>> rowList, String valueLabel) {
        return rowList.stream()
                .map(row -> row.get(valueLabel))
                .mapToDouble(value -> Double.parseDouble(value.toString()))
                .sum();
    }

    public List<Map<String, Object>> rowRepresentation(List<CombinedRow> combinedRowList) {
        return combinedRowList.stream()
                .map(CombinedRow::getRowMap)
                .toList();
    }

    public Map<String, Long> countRowLabelSizes(List<CombinedRow> combinedRowList) {
        List<String> distinctKeyList = combinedRowList.stream()
                .map(combinedRow -> combinedRow.groupedByRowLabel.getEntry())
                .toList();

        return distinctKeyList.stream()
                .flatMap(this::keyToSequences)
                .collect(Collectors.groupingBy(
                        key -> key, LinkedHashMap::new,
                        Collectors.counting())
                );
    }

    public List<Map<String, Long>> countColumnLabelSizes(List<CombinedRow> combinedRowList) {
        List<String> distinctKeyList = combinedRowList.stream()
                .flatMap(CombinedRow::getColumnAndValueEntries)
                .map(Map.Entry::getKey)
                .distinct()
                .sorted()
                .toList();

        Map<Integer, Map<String, Long>> counted = distinctKeyList.stream()
                .flatMap(this::keyToSequences)
                .collect(Collectors.groupingBy(
                        key -> key.split("->").length, LinkedHashMap::new,
                        Collectors.groupingBy(
                                key -> key, LinkedHashMap::new,
                                Collectors.counting()
                        )));
        return counted.values()
                .stream()
                .toList();
    }

    public Stream<String> keyToSequences(String key) {
        var splitted = key.split("->");
        return IntStream.range(0, splitted.length)
                .mapToObj(i -> String.join("->", Arrays.copyOfRange(splitted, 0, i + 1)));
    }

    public record GroupedByRowLabel(Map<String, Object> rowLabels) {
        public Stream<Map.Entry<String, Object>> getEntries() {
            return keyToSequences(getEntry())
                    .map(key -> Map.entry(
                            key.substring(0, key.lastIndexOf("=")),
                            key.substring(key.lastIndexOf("=") + 1)));
        }

        public String getEntry() {
            return rowLabels.entrySet().stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining("->"));
        }

        public Stream<String> keyToSequences(String key) {
            var splitted = key.split("->");
            return IntStream.range(0, splitted.length)
                    .mapToObj(i -> String.join("->", Arrays.copyOfRange(splitted, 0, i + 1)));
        }
    }


    public record GroupedByColumnLabel(Map<String, Object> columnLabels) {}


    public record ValueRecord(String valueLabel, Object value) {}


    public record CombinedColumnAndValue(GroupedByColumnLabel groupedByColumnLabel, ValueRecord valueRecord) {
        public Map.Entry<String, Object> getEntry() {
            String columnKey = groupedByColumnLabel.columnLabels.values()
                    .stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining("->"));
            return Map.entry(columnKey + "->" + valueRecord.valueLabel, valueRecord.value);
        }

    }

    public record CombinedRow(GroupedByRowLabel groupedByRowLabel,
                              List<CombinedColumnAndValue> combinedColumnAndValueList) {
        public Stream<Map.Entry<String, Object>> getRowEntries() {
            return groupedByRowLabel.getEntries();
        }

        public Stream<Map.Entry<String, Object>> getColumnAndValueEntries() {
            return combinedColumnAndValueList.stream().map(CombinedColumnAndValue::getEntry);
        }

        public Map<String, Object> getRowMap() {
            return Stream.concat(getRowEntries(), getColumnAndValueEntries())
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            Map.Entry::getValue,
                            (o, o2) -> o,
                            LinkedHashMap::new
                    ));
        }
    }


    private CombinedRow combineRow(Map.Entry<GroupedByRowLabel, Map<GroupedByColumnLabel, List<ValueRecord>>> entry) {
        return new CombinedRow(
                entry.getKey(),
                this.combineColumnWithValues(entry.getValue())
        );
    }

    private List<CombinedColumnAndValue> combineColumnWithValues(Map<GroupedByColumnLabel, List<ValueRecord>> map) {
        return map.entrySet().stream()
                .flatMap(this::combineColumnWithValues)
                .toList();
    }

    private Stream<CombinedColumnAndValue> combineColumnWithValues(Map.Entry<GroupedByColumnLabel, List<ValueRecord>> entry) {
        return entry.getValue().stream()
                .map(valueRecord -> new CombinedColumnAndValue(entry.getKey(), valueRecord));
    }

}
