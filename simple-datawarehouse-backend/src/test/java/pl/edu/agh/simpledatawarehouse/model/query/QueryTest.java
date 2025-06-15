package pl.edu.agh.simpledatawarehouse.model.query;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


class QueryTest {

    @Test
    void testToStringColumnAndTable() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        Query query = new Query(columns, table, null, null, null, null, null, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name;""");
    }

    @Test
    void testToStringColumnsAndTable() {
        List<Column> columns = List.of(
                new Column("column_name1", null, null),
                new Column("column_name2", null, null),
                new Column("column_name3", null, null)
        );
        String table = "table_name";
        Query query = new Query(columns, table, null, null, null, null, null, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name1, column_name2, column_name3
                                                       from table_name;""");
    }

    @Test
    void testToStringColumnAndTableAndOrderByStatement() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<OrderBy> orderByList = List.of(new OrderBy("column_name", true));
        Query query = new Query(columns, table, null, null, null, null, orderByList, -1 ,-1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       order by column_name asc;""");
    }

    @Test
    void testToStringColumnAndTableAndOrderByStatements() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<OrderBy> orderByList = List.of(
                new OrderBy("column_name1", true),
                new OrderBy("column_name2", true),
                new OrderBy("column_name3", true)
        );
        Query query = new Query(columns, table, null, null, null, null, orderByList, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       order by column_name1 asc, column_name2 asc, column_name3 asc;""");
    }

    @Test
    void testToStringColumnAndTableAndWhereStatement() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<Condition> whereList = List.of(new Condition("column_name", "=", "value"));
        Query query = new Query(columns, table, whereList, null, null, null, null, -1 ,-1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       where column_name = value;""");
    }

    @Test
    void testToStringColumnAndTableAndWhereStatements() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<Condition> whereList = List.of(
                new Condition("column_name1", "=", "value1"),
                new Condition("column_name2", "=", "value2"),
                new Condition("column_name3", "=", "value3")
        );
        Query query = new Query(columns, table, whereList, null, null, null, null, -1 ,-1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       where column_name1 = value1
                                                       and column_name2 = value2
                                                       and column_name3 = value3;""");
    }

    @Test
    void testToStringColumnAndTableAndJoinStatement() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<Join> joinList = List.of(
                new Join("inner", "other_table_name", List.of(new Condition("column_name", "=", "other_column_name"))));
        Query query = new Query(columns, table, null, joinList, null, null, null, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       inner join other_table_name on
                                                       column_name = other_column_name;""");
    }

    @Test
    void testToStringColumnAndTableAndJoinStatements() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<Join> joinList = List.of(
                new Join("inner", "other_table_name1", List.of(new Condition("column_name1", "=", "other_column_name1"))),
                new Join("inner", "other_table_name2", List.of(new Condition("column_name2", "=", "other_column_name2"))),
                new Join("inner", "other_table_name3", List.of(new Condition("column_name3", "=", "other_column_name3")))
        );
        Query query = new Query(columns, table, null, joinList, null, null, null, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       inner join other_table_name1 on
                                                       column_name1 = other_column_name1
                                                       inner join other_table_name2 on
                                                       column_name2 = other_column_name2
                                                       inner join other_table_name3 on
                                                       column_name3 = other_column_name3;""");
    }

    @Test
    void testToStringColumnAndTableAndGroupByStatement() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<String> groupByList = List.of("column_name");
        Query query = new Query(columns, table, null, null, groupByList, null, null, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       group by column_name;""");
    }

    @Test
    void testToStringColumnAndTableAndGroupByStatements() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<String> groupByList = List.of("column_name1, column_name2", "column_name3");
        Query query = new Query(columns, table, null, null, groupByList, null, null, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select column_name
                                                       from table_name
                                                       group by column_name1, column_name2, column_name3;""");
    }

    @Test
    void testToStringColumnAndTableAndGroupByStatementAndHavingStatement() {
        List<Column> columns = List.of(new Column("column_name", null, "sum"));
        String table = "table_name";
        List<String> groupByList = List.of("column_name");
        List<Condition> havingList = List.of(new Condition("column_name", ">", "value"));
        Query query = new Query(columns, table, null, null, groupByList, havingList, null, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select sum(column_name)
                                                       from table_name
                                                       group by column_name
                                                       having sum(column_name) > value;""");
    }

    @Test
    void testThrowsExceptionWhenHavingStatementIsNotUsedWithGroupByStatement() {
        List<Column> columns = List.of(new Column("column_name", null, "sum"));
        String table = "table_name";
        List<Condition> havingList = List.of(new Condition("column_name", ">", "value"));
        Query query = new Query(columns, table, null, null, null, havingList, null, -1, -1);
        Assertions.assertThatThrownBy(query::toString)
                  .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void testThrowsExceptionWhenHavingStatementIsNotUsedWithAggregatedFunction() {
        List<Column> columns = List.of(new Column("column_name", null, null));
        String table = "table_name";
        List<String> groupByList = List.of("column_name");
        List<Condition> havingList = List.of(new Condition("column_name", ">", "value"));
        Query query = new Query(columns, table, null, null, groupByList, havingList, null, -1 ,-1);
        Assertions.assertThatThrownBy(query::toString)
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void testToStringWithAllStatements() {
        List<Column> columns = List.of(new Column("column_name", null, "sum"));
        String table = "table_name";
        List<Condition> whereList = List.of(new Condition("column_name", "=", "value"));
        List<Join> joinList = List.of(
                new Join("inner", "other_table_name", List.of(new Condition("column_name", "=", "other_column_name"))));
        List<String> groupByList = List.of("column_name");
        List<Condition> havingList = List.of(new Condition("column_name", ">", "value"));
        List<OrderBy> orderByList = List.of(new OrderBy("column_name", true));
        Query query = new Query(columns, table, whereList, joinList, groupByList, havingList, orderByList, -1, -1);
        assertThat(query.toSql()).isEqualTo("""
                                                       select sum(column_name)
                                                       from table_name
                                                       inner join other_table_name on
                                                       column_name = other_column_name
                                                       where column_name = value
                                                       group by column_name
                                                       having sum(column_name) > value
                                                       order by column_name asc;""");
    }
}