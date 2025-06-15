package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.DataRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryResult;
import pl.edu.agh.simpledatawarehouse.model.dto.TableResult;
import pl.edu.agh.simpledatawarehouse.model.query.Query;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QueryService {

    @Lazy
    private final DataRepository dataRepository;

    public TableResult executeTableQuery(final Query query) {
        String sql = query.toSql();
        String sqlTotalRecords = query.toTotalRecordsSql();
        log.info("Executing query: {}", sql);
        var rowList = dataRepository.execute(sql);
        var totalRecords = dataRepository.execute(sqlTotalRecords);
        var columnList = extractQueryResultColumnList(query);
        return TableResult.builder()
                .tableName(query.table())
                .columnList(columnList)
                .rowList(rowList)
                .totalRecords((Long) totalRecords.getFirst().get("total_records"))
                .build();
    }

    public QueryResult executeQuery(final Query query) {
        String sql = query.toSql();
        log.info("Executing query: {}", sql);
        var rowList = dataRepository.execute(sql);
        var columnList = extractQueryResultColumnList(query);
        return QueryResult.builder()
                .columnList(columnList)
                .rowList(rowList)
                .sql(sql)
                .build();
    }

    private List<String> extractQueryResultColumnList(final Query query) {
        return query.columnList()
                .stream()
                .map(column -> {
                    if (StringUtils.isNotBlank(column.alias())) {
                        return column.alias();
                    }
                    return column.name();
                })
                .toList();
    }

}
