package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.TableRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.TableDto;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TableService {

    private final TableRepository tableRepository;

    public TableDto getTable(String name) {
        String sql = STR."SELECT * FROM \{name}";

        List<Map<String, Object>> tableRows = tableRepository.getTableRows(sql);
        List<String> columns = tableRows.getFirst().keySet().stream().toList();

        TableDto tableDto = new TableDto();
        tableDto.setTableName(name);
        tableDto.setColumns(columns);
        tableDto.setRows(tableRows);
        return tableDto;
    }

}
