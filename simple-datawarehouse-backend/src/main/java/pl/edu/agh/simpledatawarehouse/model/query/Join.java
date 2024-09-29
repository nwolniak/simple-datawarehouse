package pl.edu.agh.simpledatawarehouse.model.query;

import java.util.List;
import java.util.stream.Collectors;

public record Join(String type, String table, List<Condition> conditions) {

    @Override
    public String toString() {
        var conditions = conditions().stream()
                                     .map(condition -> STR."\{condition.leftOperand()} \{condition.operator()} \{condition.rightOperand()}")
                                     .collect(Collectors.joining(""));
        return STR."\{type} JOIN \{table} ON \{conditions}";
    }
}
