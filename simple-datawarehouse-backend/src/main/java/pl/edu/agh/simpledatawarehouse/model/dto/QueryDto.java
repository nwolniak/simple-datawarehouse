package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.agh.simpledatawarehouse.model.query.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QueryDto {
    private List<Column> columns;
    private String fromTable;
    private List<Join> joins;
    private List<String> groupByList;
    private List<Having> havingList;
    private List<OrderBy> orderByList;
    private List<Where> whereList;
}
