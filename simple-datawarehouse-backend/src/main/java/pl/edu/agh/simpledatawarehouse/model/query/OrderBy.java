package pl.edu.agh.simpledatawarehouse.model.query;

import org.apache.commons.lang3.StringUtils;

public record OrderBy(String columnName, boolean ascending) {

    public OrderBy {
        if (StringUtils.isBlank(columnName)) {
            throw new IllegalArgumentException("Column name cannot be blank");
        }
    }

    @Override
    public String toString() {
        return columnName + " " + (ascending ? "asc" : "desc");
    }
}

