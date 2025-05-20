package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.DataRepository;
import pl.edu.agh.simpledatawarehouse.mappers.QueryMapper;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryResult;
import pl.edu.agh.simpledatawarehouse.model.query.Query;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QueryService {

    @Lazy
    private final DataRepository dataRepository;

    private final QueryMapper queryMapper;

    public QueryResult executeQuery(final QueryDto queryDto) {
        Query query = queryMapper.toQuery(queryDto);
        String sql = query.toString();
        log.info("Executing query: {}", sql);
        var rowList = dataRepository.execute(sql);
        var columnList = extractQueryResultColumnList(query);
        return QueryResult.builder()
                          .columnList(columnList)
                          .rowList(rowList)
                          .sql(sql)
                          .build();
    }

    public QueryResult executeQuery(final Query query) {
        String sql = query.toString();
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
