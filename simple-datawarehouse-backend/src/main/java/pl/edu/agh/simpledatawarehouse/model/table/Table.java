package pl.edu.agh.simpledatawarehouse.model.table;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record Table(
        String name,
        List<Map<String, Object>> rows
) {
}
