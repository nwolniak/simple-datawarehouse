package pl.edu.agh.simpledatawarehouse.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.simpledatawarehouse.model.dto.TableDto;
import pl.edu.agh.simpledatawarehouse.service.TableService;

@RestController
@RequestMapping("/simple-datawarehouse")
@CrossOrigin
@RequiredArgsConstructor
public class TableController {

    private final TableService tableService;

    @GetMapping("tables/{tableName}")
    public ResponseEntity<TableDto> getTable(@PathVariable String tableName) {
        try {
            var tableDto = tableService.getTable(tableName);
            return ResponseEntity
                    .ok(tableDto);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }

}
