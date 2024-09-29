package pl.edu.agh.simpledatawarehouse.model.query;

import java.util.List;

public record Query(
        List<Column> columns,
        String fromTable,
        List<Join> joins,
        List<String> groupByList,
        List<Having> havingList,
        List<OrderBy> orderByList,
        List<Where> whereList
) {
}

