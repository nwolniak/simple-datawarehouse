package pl.edu.agh.simpledatawarehouse.model.query;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ConditionTest {

    @Test
    void testToStringWithAllFields() {
        Condition condition = new Condition("left_operand", "=", "right_operand");
        assertThat(condition.toString()).isEqualTo("left_operand = right_operand");
    }

    @Test
    void testToStringOperatorStartsWith() {
        Condition condition = new Condition("left_operand", "startsWith", "right_operand");
        assertThat(condition.toString()).isEqualTo("left_operand like 'right_operand%'");
    }

    @Test
    void testToStringOperatorEndsWith() {
        Condition condition = new Condition("left_operand", "endsWith", "right_operand");
        assertThat(condition.toString()).isEqualTo("left_operand like '%right_operand'");
    }

    @Test
    void testToStringOperatorContains() {
        Condition condition = new Condition("left_operand", "contains", "right_operand");
        assertThat(condition.toString()).isEqualTo("left_operand like '%right_operand%'");
    }

    @Test
    void testToStringOperatorNotContains() {
        Condition condition = new Condition("left_operand", "notContains", "right_operand");
        assertThat(condition.toString()).isEqualTo("left_operand not like '%right_operand%'");
    }

    @ParameterizedTest
    @CsvSource({
            "left_operand,operator, ",
            "left_operand, ,right_operand",
            "left_operand, , ",
            " ,operator, right_operand",
            " ,operator, ",
            " , ,right_operand",
            " , , "
    })
    void testConditionThrowsExceptionOnAnyBlankField(String leftOperand, String operator, String rightOperand) {
        assertThatThrownBy(() -> new Condition(leftOperand, operator, rightOperand))
                .isInstanceOf(IllegalArgumentException.class);
    }
}