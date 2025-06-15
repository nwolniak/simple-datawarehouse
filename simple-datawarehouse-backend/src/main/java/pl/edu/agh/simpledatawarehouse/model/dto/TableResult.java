package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record TableResult(
        String tableName,
        List<String> columnList,
        List<Map<String, Object>> rowList,
        long totalRecords
) {
}
