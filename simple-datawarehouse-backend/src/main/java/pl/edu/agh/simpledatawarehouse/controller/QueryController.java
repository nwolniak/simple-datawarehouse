package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryResult;
import pl.edu.agh.simpledatawarehouse.service.QueryService;

@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class QueryController {

    private final QueryService queryService;

    @PostMapping("query")
    public ResponseEntity<QueryResult> getQueryResults(@RequestBody QueryDto queryDto) {
        try {
            var queryResult = queryService.queryResults(queryDto);
            return ResponseEntity
                    .ok(queryResult);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }

}
