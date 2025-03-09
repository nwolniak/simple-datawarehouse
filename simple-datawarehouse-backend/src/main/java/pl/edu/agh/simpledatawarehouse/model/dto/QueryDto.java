package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.agh.simpledatawarehouse.model.query.Column;
import pl.edu.agh.simpledatawarehouse.model.query.Condition;
import pl.edu.agh.simpledatawarehouse.model.query.Join;
import pl.edu.agh.simpledatawarehouse.model.query.OrderBy;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QueryDto {
    private List<Column> columnList;
    private String table;
    private List<Join> joinList;
    private List<String> groupByList;
    private List<Condition> havingList;
    private List<OrderBy> orderByList;
    private List<Condition> whereList;
}
