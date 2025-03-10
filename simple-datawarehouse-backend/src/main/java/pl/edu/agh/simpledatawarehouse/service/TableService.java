package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.TableRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.TableResult;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TableService {

    @Lazy
    private final TableRepository tableRepository;

    public TableResult getTable(String tableName) {
        String sql = "select * from " + tableName;

        List<Map<String, Object>> tableRows = tableRepository.getTableRows(sql);
        List<String> columns = tableRows.getFirst()
                                        .keySet()
                                        .stream()
                                        .toList();
        return TableResult.builder()
                          .tableName(tableName)
                          .columnList(columns)
                          .rowList(tableRows)
                          .build();
    }

}
