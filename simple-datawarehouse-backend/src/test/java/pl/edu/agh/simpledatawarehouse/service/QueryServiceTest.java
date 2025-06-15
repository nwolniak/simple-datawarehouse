package pl.edu.agh.simpledatawarehouse.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.agh.simpledatawarehouse.dao.DataRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryResult;
import pl.edu.agh.simpledatawarehouse.model.query.Column;
import pl.edu.agh.simpledatawarehouse.model.query.Query;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;

@ExtendWith(MockitoExtension.class)
class QueryServiceTest {

    @InjectMocks
    private QueryService queryService;

    @Mock
    private DataRepository dataRepository;

    @Test
    void executeQuery() {
        Query query = new Query(
                List.of(new Column("column_name", null, null)),
                "table_name",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                -1,
                -1
        );
        Mockito.doReturn(List.of())
                .when(dataRepository)
                .execute(anyString());

        QueryResult queryResult = queryService.executeQuery(query);
        assertThat(queryResult).isNotNull();
        assertThat(queryResult.columnList()).isNotEmpty();
        assertThat(queryResult.rowList()).isEmpty();
        assertThat(queryResult.sql()).isNotEmpty();
    }
}