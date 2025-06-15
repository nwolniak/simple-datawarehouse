package pl.edu.agh.simpledatawarehouse.model.query;

import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public record Query(
        List<Column> columnList,
        String table,
        List<Condition> whereList,
        List<Join> joinList,
        List<String> groupByList,
        List<Condition> havingList,
        List<OrderBy> orderByList,
        int pageNumber,
        int pageSize
) {

    public Query {
        if (Objects.isNull(columnList) || columnList.isEmpty()) {
            throw new IllegalArgumentException("Columns cannot be empty");
        }
        if (StringUtils.isBlank(table)) {
            throw new IllegalArgumentException("Table cannot be blank");
        }
    }

    public String toSql() {
        return queryToSql(this);
    }

    public String toTotalRecordsSql() {
        return queryToSql(new Query(
                List.of(new Column("*", "total_records", "COUNT")),
                table,
                whereList,
                joinList,
                groupByList,
                havingList,
                List.of(),
                0,
                0
        ));
    }

    private String queryToSql(final Query query) {
        String columns = joinStatements(query.columnList, ", ");
        String from = query.table;
        String where = joinStatements(query.whereList, "\nand ");
        String joins = joinStatements(query.joinList, "\n");
        String groupBy = joinStatements(query.groupByList, ", ");
        var havingList = enhanceHavingStatementsWithSelectFunctions(query.columnList, query.havingList);
        String having = joinStatements(havingList, " and ");
        String orderBy = joinStatements(query.orderByList(), ", ");

        var sql = new StringBuilder().append("select ")
                                     .append(columns)
                                     .append("\nfrom ")
                                     .append(from);
        if (!joins.isBlank()) {
            sql.append("\n")
               .append(joins);
        }
        if (!where.isBlank()) {
            sql.append("\nwhere ")
               .append(where);
        }
        if (!groupBy.isBlank()) {
            sql.append("\ngroup by ")
               .append(groupBy);
        }
        if (!having.isBlank() && groupBy.isBlank()) {
            throw new IllegalArgumentException("Having statement can be used only when group by statement exists");
        } else if (!having.isBlank()) {
            sql.append("\nhaving ")
               .append(having);
        }
        if (!orderBy.isBlank()) {
            sql.append("\norder by ")
               .append(orderBy);
        }
        if (query.pageNumber != 0 && query.pageSize != 0) {
            int offset = (query.pageNumber - 1) * query.pageSize;
            sql.append("\nlimit ")
                    .append(query.pageSize);
            sql.append("\noffset ")
                    .append(offset);
        }
        return sql.append(";").toString();
    }

    private <T> String joinStatements(List<T> statementList, String delimiter) {
        if (Objects.isNull(statementList)) {
            return StringUtils.EMPTY;
        }
        return statementList
                .stream()
                .map(T::toString)
                .collect(Collectors.joining(delimiter));
    }

    private List<Condition> enhanceHavingStatementsWithSelectFunctions(List<Column> columns,
                                                                       List<Condition> havingList) {
        if (Objects.isNull(columns) || Objects.isNull(havingList)) {
            return List.of();
        }
        var functionColumns = columns
                .stream()
                .filter(column -> StringUtils.isNotBlank(column.aggregate()))
                .collect(Collectors.toMap(Column::name, Column::aggregate));

        return havingList
                .stream()
                .map(condition -> {
                    var leftOperand = condition.leftOperand();
                    if (!functionColumns.containsKey(leftOperand)) {
                        throw new IllegalArgumentException("Having statement used without aggregate aggregate");
                    }
                    var function = functionColumns.get(leftOperand);
                    leftOperand = function + "(" + leftOperand + ")";
                    return new Condition(leftOperand, condition.operator(), condition.rightOperand());
                })
                .toList();
    }
}

