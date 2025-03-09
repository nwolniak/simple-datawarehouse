package pl.edu.agh.simpledatawarehouse.model.query;

import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public record Query(
        List<Column> columns,
        String table,
        List<Condition> whereList,
        List<Join> joinList,
        List<String> groupByList,
        List<Condition> havingList,
        List<OrderBy> orderByList
) {

    public Query {
        if (Objects.isNull(columns) || columns.isEmpty()) {
            throw new IllegalArgumentException("Columns cannot be empty");
        }
        if (StringUtils.isBlank(table)) {
            throw new IllegalArgumentException("Table cannot be blank");
        }
    }

    @Override
    public String toString() {
        return queryToSql(this);
    }

    private String queryToSql(final Query query) {
        String columns = joinStatements(query.columns, ", ");
        String from = query.table;
        String where = joinStatements(query.whereList, "\nand ");
        String joins = joinStatements(query.joinList, "\n");
        String groupBy = joinStatements(query.groupByList, ", ");
        var havingList = enhanceHavingStatementsWithSelectFunctions(query.columns, query.havingList);
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
                .filter(column -> StringUtils.isNotBlank(column.function()))
                .collect(Collectors.toMap(Column::name, Column::function));

        return havingList
                .stream()
                .map(condition -> {
                    var leftOperand = condition.leftOperand();
                    if (!functionColumns.containsKey(leftOperand)) {
                        throw new IllegalArgumentException("Having statement used without aggregate function");
                    }
                    var function = functionColumns.get(leftOperand);
                    leftOperand = function + "(" + leftOperand + ")";
                    return new Condition(leftOperand, condition.operator(), condition.rightOperand());
                })
                .toList();
    }
}

