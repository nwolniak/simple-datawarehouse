package pl.edu.agh.simpledatawarehouse.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.agh.simpledatawarehouse.dao.TableRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.TableResult;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class TableServiceTest {

    @InjectMocks
    private TableService tableService;

    @Mock
    private TableRepository tableRepository;

    @Test
    void getTable() {
        List<Map<String, Object>> rowList = List.of(Map.of("column_name", "value"));
        Mockito.doReturn(rowList)
               .when(tableRepository)
               .getTableRows(Mockito.anyString());

        TableResult tableResult = tableService.getTable("table_name");

        assertThat(tableResult).isNotNull();
        assertThat(tableResult.tableName()).isEqualTo("table_name");
        assertThat(tableResult.columnList()).contains("column_name");
        assertThat(tableResult.rowList()).contains(Map.of("column_name", "value"));
    }
}