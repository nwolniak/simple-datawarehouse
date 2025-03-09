package pl.edu.agh.simpledatawarehouse.model.query;

import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public record Join(String joinType, String tableName, List<Condition> conditions) {

    public Join {
        if (StringUtils.isAnyBlank(joinType, tableName)) {
            throw new IllegalArgumentException("Join type or table name cannot be blank");
        }
        if (Objects.isNull(conditions) || conditions.isEmpty()) {
            throw new IllegalArgumentException("Join conditions cannot be empty");
        }
    }

    @Override
    public String toString() {
        var conditions = conditions().stream()
                                     .map(Condition::toString)
                                     .collect(Collectors.joining("\nand "));
        return joinType + " join " + tableName + " on\n" + conditions;
    }
}
