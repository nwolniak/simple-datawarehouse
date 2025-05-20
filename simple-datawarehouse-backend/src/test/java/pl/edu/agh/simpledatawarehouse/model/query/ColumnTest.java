package pl.edu.agh.simpledatawarehouse.model.query;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ColumnTest {

    @Test
    void testToStringWithColumnName() {
        Column column = new Column("column_name", null, null);
        assertThat(column.toString()).isEqualTo("column_name");
    }

    @Test
    void testToStringWithColumnAndAlias() {
        Column column = new Column("column_name", "table.column_name", null);
        assertThat(column.toString()).isEqualTo("column_name as table.column_name");
    }

    @Test
    void testToStringWithColumnNameAndFunction() {
        Column column = new Column("column_name", null, "aggregate");
        assertThat(column.toString()).isEqualTo("aggregate(column_name)");
    }

    @Test
    void testToStringWithColumnNameAndFunctionAndAlias() {
        Column column = new Column("column_name", "table.column_name", "aggregate");
        assertThat(column.toString()).isEqualTo("aggregate(column_name) as table.column_name");
    }

    @Test
    void testColumnThrowsExceptionOnBlankColumnName() {
        assertThatThrownBy(() -> new Column(null, null, null))
                .isInstanceOf(IllegalArgumentException.class);
    }
}