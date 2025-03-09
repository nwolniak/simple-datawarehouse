package pl.edu.agh.simpledatawarehouse.model.query;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


class JoinTest {

    @Test
    void testToStringWithJoinTypeAndTableAndCondition() {
        Join join = new Join("inner", "table_name", List.of(new Condition("column_name", "=", "other_column_name")));
        assertThat(join.toString())
                .isEqualTo("""
                                   inner join table_name on
                                   column_name = other_column_name""");
    }

    @Test
    void testToStringWithJoinTypeAndTableAndConditions() {
        Join join = new Join("inner", "table_name", List.of(
                new Condition("column_name1", "=", "other_column_name1"),
                new Condition("column_name2", "=", "other_column_name2"),
                new Condition("column_name3", "=", "other_column_name3")
        ));
        assertThat(join.toString())
                .isEqualTo("""
                                   inner join table_name on
                                   column_name1 = other_column_name1
                                   and column_name2 = other_column_name2
                                   and column_name3 = other_column_name3""");
    }

    @Test
    void testJoinThrowsExceptionOnBlankJoinType() {
        Assertions.assertThatThrownBy(() -> new Join(null, "table_name",
                                                     List.of(new Condition("column_name", "=", "other_column_name"))
                  ))
                  .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void testJoinThrowsExceptionOnBlankTableName() {
        Assertions.assertThatThrownBy(() -> new Join("inner", null,
                                                     List.of(new Condition("column_name", "=", "other_column_name"))
                  ))
                  .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void testJoinThrowsExceptionOnBlankJoinTypeAndTableName() {
        Assertions.assertThatThrownBy(() -> new Join(null, null,
                                                     List.of(new Condition("column_name", "=", "other_column_name"))
                  ))
                  .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void testJoinThrowsExceptionOnEmptyConditions() {
        Assertions.assertThatThrownBy(() -> new Join("inner", "table_name", List.of()))
                  .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void testJoinThrowsExceptionOnNullConditions() {
        Assertions.assertThatThrownBy(() -> new Join("inner", "table_name", null))
                  .isInstanceOf(IllegalArgumentException.class);
    }

}