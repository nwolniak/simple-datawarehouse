package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.model.dto.PivotTableQuery;
import pl.edu.agh.simpledatawarehouse.model.dto.PivotTableResult;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryResult;
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

    @PostMapping("query")
    public ResponseEntity<QueryResult> getQueryResults(@RequestBody QueryDto queryDto) {
        try {
            var queryResult = queryService.executeQuery(queryDto);
            return ResponseEntity
                    .ok(queryResult);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }

    @PostMapping("queryPivotData")
    public ResponseEntity<PivotTableResult> getPivotTableResults(@RequestBody PivotTableQuery pivotTableQuery) {
        try {
            var pivotTableResult = pivotTableService.getPivotTable(pivotTableQuery);
            return ResponseEntity
                    .ok(pivotTableResult);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }

}
