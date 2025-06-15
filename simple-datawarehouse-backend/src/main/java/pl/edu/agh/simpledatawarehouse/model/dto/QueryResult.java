package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record QueryResult(
        List<String> columnList,
        List<Map<String, Object>> rowList,
        String sql) {
}
