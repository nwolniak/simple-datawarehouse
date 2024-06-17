package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.DataRepository;
import pl.edu.agh.simpledatawarehouse.mappers.QueryMapper;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.dto.TableDto;
import pl.edu.agh.simpledatawarehouse.model.query.Column;
import pl.edu.agh.simpledatawarehouse.model.query.Join;
import pl.edu.agh.simpledatawarehouse.model.query.OrderBy;
import pl.edu.agh.simpledatawarehouse.model.query.Query;

import java.util.List;
import java.util.Map;
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
        List<String> columns = tableRows.getFirst()
                                        .keySet()
                                        .stream()
                                        .toList();
        TableDto tableDto = new TableDto();
        tableDto.setColumns(columns);
        tableDto.setRows(tableRows);
        return tableDto;
    }

    private String queryToSql(final Query query) {
        var select = extractSelectedColumns(query);
        var from = query.fromTable();
        var joins = extractJoinStatements(query);
        var groupBy = String.join(", ", query.groupByList());
        var orderBy = extractOrderByStatements(query);

        var sql = new StringBuilder().append(STR."SELECT \{select}\n")
                                     .append(STR."FROM \{from}\n");

        if (!joins.isBlank()) {
            sql.append(STR."\{joins}\n");
        }
        if (!groupBy.isBlank()) {
            sql.append(STR."GROUP BY \{groupBy}\n");
        }
        if (!orderBy.isBlank()) {
            sql.append(STR."ORDER BY \{orderBy}");
        }
        return sql.toString();
    }

    private String extractSelectedColumns(Query query) {
        return query.columns()
                    .stream()
                    .map(Column::name)
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
