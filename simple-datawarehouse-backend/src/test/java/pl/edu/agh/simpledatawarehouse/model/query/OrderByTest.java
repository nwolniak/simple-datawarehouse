package pl.edu.agh.simpledatawarehouse.model.query;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class OrderByTest {

    @Test
    void testToStringWithColumnNameAndAscending() {
        OrderBy orderBy = new OrderBy("column_name", true);
        assertThat(orderBy.toString()).isEqualTo("column_name asc");
    }

    @Test
    void testToStringWithColumnNameAndDescending() {
        OrderBy orderBy = new OrderBy("column_name", false);
        assertThat(orderBy.toString()).isEqualTo("column_name desc");
    }

    @Test
    void testOrderByThrowsExceptionOnBlankColumnName() {
        assertThatThrownBy(() -> new OrderBy(null, true))
                .isInstanceOf(IllegalArgumentException.class);
    }
}