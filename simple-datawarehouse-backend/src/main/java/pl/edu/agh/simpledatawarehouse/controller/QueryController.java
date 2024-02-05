package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.service.QueryService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class QueryController {

    private final QueryService queryService;

    @PostMapping("query")
    public List<Map<String, Object>> getQueryResults(@RequestBody QueryDto queryDto) {
        return queryService.queryResults(queryDto);
    }

}
