package pl.edu.agh.simpledatawarehouse.model.dto;

import java.util.List;

public record PivotTableQuery(
        List<String> rowLabels,
        List<String> columnLabels,
        List<String> valueLabels) {}
