package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.service.TableService;

@Slf4j
@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class TableController {

    private final TableService tableService;

    @GetMapping("tables/{tableName}")
    public ResponseEntity<?> getTable(@PathVariable("tableName") String tableName) {
        try {
            var tableDto = tableService.getTable(tableName);
            return ResponseEntity
                    .ok(tableDto);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());
        }
    }

}
