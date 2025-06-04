package pl.edu.agh.simpledatawarehouse.model.dto;

import pl.edu.agh.simpledatawarehouse.model.query.Query;

import java.util.List;

public record PivotTableQuery(
        Query query,
        List<String> rowLabels,
        List<String> columnLabels,
        List<String> valueLabels) {

    public boolean isPivoted() {
        return !rowLabels.isEmpty();
    }

}
