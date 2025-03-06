package pl.edu.agh.simpledatawarehouse.model.query;

public record Where(String columnName, String operator, String value) {
    @Override
    public String toString() {
        return switch (operator) {
            case "startsWith" -> columnName + "LIKE '" + value + "%'";
            case "contains" -> columnName + " LIKE '%" + value + "%'";
            case "notContains" -> columnName + " NOT LIKE '%" + value + "%'";
            case "endsWith" -> columnName + " LIKE '%" + value + "'";
            default -> columnName + " " + operator + " " + operator;
        };
    }
}
