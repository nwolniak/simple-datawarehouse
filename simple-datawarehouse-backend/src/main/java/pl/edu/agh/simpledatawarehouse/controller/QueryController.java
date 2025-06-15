package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.model.dto.PivotTableQuery;
import pl.edu.agh.simpledatawarehouse.model.dto.PivotTableResult;
import pl.edu.agh.simpledatawarehouse.model.dto.TableResult;
import pl.edu.agh.simpledatawarehouse.model.query.Query;
import pl.edu.agh.simpledatawarehouse.service.PivotTableService;
import pl.edu.agh.simpledatawarehouse.service.QueryService;

@Slf4j
@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class QueryController {

    private final QueryService queryService;
    private final PivotTableService pivotTableService;

    @PostMapping("table-query")
    public ResponseEntity<TableResult> getQueryResults(@RequestBody Query query) {
        var queryResult = queryService.executeTableQuery(query);
        return ResponseEntity.ok(queryResult);
    }

    @PostMapping("queryPivotData")
    public ResponseEntity<PivotTableResult> getPivotTableResults(@RequestBody PivotTableQuery pivotTableQuery) {
        var pivotTableResult = pivotTableService.getPivotTable(pivotTableQuery);
        return ResponseEntity.ok(pivotTableResult);
    }

}
