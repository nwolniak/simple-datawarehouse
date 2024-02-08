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

    String tableName;
    List<String> columns;
    List<Map<String, Object>> rows;

}
