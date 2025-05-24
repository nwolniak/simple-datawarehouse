package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record PivotTableResult(
        QueryResult queryResult,
        List<String> rowLabelList,
        Map<String, Long> rowLabelMap,
        List<Map<String, Long>> columnLabelList,
        List<Map<String, Object>> rowList) {}
