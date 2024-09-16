package pl.edu.agh.simpledatawarehouse.model.query;

public record Where(String columnName, String operator, String value) {
    @Override
    public String toString() {
        return switch (operator) {
            case "startsWith" -> STR."\{columnName} LIKE '\{value}%'";
            case "contains" -> STR."\{columnName} LIKE '%\{value}%'";
            case "notContains" -> STR."\{columnName} NOT LIKE '%\{value}%'";
            case "endsWith" -> STR."\{columnName} LIKE '%\{value}'";
            default -> STR."\{columnName} \{operator} \{value}";
        };
    }
}
