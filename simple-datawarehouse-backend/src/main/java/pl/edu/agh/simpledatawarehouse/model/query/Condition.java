package pl.edu.agh.simpledatawarehouse.model.query;

public record Condition(
        String leftOperand,
        String operator,
        String rightOperand
) {
}
