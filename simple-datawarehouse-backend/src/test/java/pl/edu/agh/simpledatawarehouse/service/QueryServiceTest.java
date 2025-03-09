package pl.edu.agh.simpledatawarehouse.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.agh.simpledatawarehouse.dao.DataRepository;
import pl.edu.agh.simpledatawarehouse.mappers.QueryMapper;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
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

    @Mock
    private QueryMapper queryMapper;

    @Test
    void queryResults() {
        Query query = new Query(
                List.of(new Column("column_name", null, null)),
                "table_name",
                List.of(),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        );
        Mockito.doReturn(query)
               .when(queryMapper)
               .toQuery(Mockito.any(QueryDto.class));
        Mockito.doReturn(List.of())
               .when(dataRepository)
               .execute(anyString());

        QueryResult queryResult = queryService.queryResults(new QueryDto());
        assertThat(queryResult).isNotNull();
        assertThat(queryResult.columnList()).isNotEmpty();
        assertThat(queryResult.rowList()).isEmpty();
        assertThat(queryResult.sql()).isNotEmpty();
    }
}