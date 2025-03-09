package pl.edu.agh.simpledatawarehouse.model.query;

import org.apache.commons.lang3.StringUtils;

public record Condition(String leftOperand, String operator, String rightOperand) {

    public Condition {
        if (StringUtils.isAnyBlank(leftOperand, operator, rightOperand)) {
            throw new IllegalArgumentException("Condition fields cannot be blank");
        }
    }

    @Override
    public String toString() {
        return switch (operator) {
            case "startsWith" -> leftOperand + " like '" + rightOperand + "%'";
            case "endsWith" -> leftOperand + " like '%" + rightOperand + "'";
            case "contains" -> leftOperand + " like '%" + rightOperand + "%'";
            case "notContains" -> leftOperand + " not like '%" + rightOperand + "%'";
            default -> leftOperand + " " + operator + " " + rightOperand;
        };
    }
}
