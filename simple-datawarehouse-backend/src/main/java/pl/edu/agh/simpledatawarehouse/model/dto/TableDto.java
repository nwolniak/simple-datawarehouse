package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TableDto {
    private String tableName;
    private List<String> columns;
    private List<Map<String, Object>> rows;
    private String query;
}
