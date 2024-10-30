package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.DataRepository;
import pl.edu.agh.simpledatawarehouse.mappers.QueryMapper;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.dto.TableDto;
import pl.edu.agh.simpledatawarehouse.model.query.*;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class QueryService {

    @Lazy
    private final DataRepository dataRepository;

    public TableDto queryResults(final QueryDto queryDto) {
        Query query = QueryMapper.INSTANCE.toQuery(queryDto);
        String sql = queryToSql(query);
        log.info(sql);
        List<Map<String, Object>> tableRows = dataRepository.execute(sql);
        TableDto tableDto = new TableDto();
        tableDto.setQuery(sql);
        if (tableRows.isEmpty()) {
            tableDto.setColumns(query.columns()
                                     .stream()
                                     .map(Column::alias)
                                     .toList());
            tableDto.setRows(List.of(query.columns()
                                          .stream()
                                          .map(Column::alias)
                                          .collect(Collectors.toMap(col -> col, col -> ""))));
        } else {
            List<String> columns = tableRows.getFirst()
                                            .keySet()
                                            .stream()
                                            .toList();
            tableDto.setColumns(columns);
            tableDto.setRows(tableRows);
        }
        return tableDto;
    }

    private String queryToSql(final Query query) {
        var columns = extractSelectedColumns(query);
        var from = query.fromTable();
        var joins = extractJoinStatements(query);
        var groupBy = String.join(", ", query.groupByList());
        var orderBy = extractOrderByStatements(query);
        var where = extractWhereStatements(query);
        var having = extractHavingStatements(query);

        var sql = new StringBuilder().append(STR."SELECT \{columns}\n")
                                     .append(STR."FROM \{from}\n");

        if (!joins.isBlank()) {
            sql.append(STR."\{joins}\n");
        }
        if (!where.isBlank()) {
            sql.append(STR."WHERE \{where}\n");
        }
        if (!groupBy.isBlank()) {
            sql.append(STR."GROUP BY \{groupBy}\n");
        }
        if (!having.isBlank()) {
            sql.append(STR."HAVING \{having}\n");
        }
        if (!orderBy.isBlank()) {
            sql.append(STR."ORDER BY \{orderBy}");
        }
        return sql.toString();
    }

    private String extractWhereStatements(Query query) {
        return query.whereList()
                    .stream()
                    .map(Where::toString)
                    .collect(Collectors.joining(" AND "));
    }

    private String extractHavingStatements(Query query) {
        var functionColumns = query.columns()
                                   .stream()
                                   .filter(column -> !"None".equals(column.function()))
                                   .collect(Collectors.toMap(Column::name, Function.identity()));

        var havingList = query.havingList()
                              .stream()
                              .map(having -> {
                                  var columnName = having.columnName();
                                  if (functionColumns.containsKey(having.columnName())) {
                                      var column = functionColumns.get(columnName);
                                      columnName = STR."\{column.function()}(\{column.name()})";
                                  }
                                  return new Having(columnName, having.operator(), having.value());
                              })
                              .toList();

        return havingList
                    .stream()
                    .map(Having::toString)
                    .collect(Collectors.joining(" AND "));
    }

    private String extractSelectedColumns(Query query) {
        return query.columns()
                    .stream()
                    .map(Column::toString)
                    .collect(Collectors.joining(", "));
    }

    private String extractJoinStatements(Query query) {
        return query.joins()
                    .stream()
                    .map(Join::toString)
                    .collect(Collectors.joining("\n"));
    }

    private String extractOrderByStatements(Query query) {
        return query.orderByList()
                    .stream()
                    .map(OrderBy::toString)
                    .collect(Collectors.joining(", "));
    }

}
