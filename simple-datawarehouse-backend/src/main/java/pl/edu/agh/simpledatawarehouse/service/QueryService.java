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
        String sql = query.toString();
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

}
