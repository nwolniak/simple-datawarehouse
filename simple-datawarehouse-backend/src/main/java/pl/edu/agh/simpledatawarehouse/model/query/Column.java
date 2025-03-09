package pl.edu.agh.simpledatawarehouse.model.query;

import org.apache.commons.lang3.StringUtils;

public record Column(String name, String alias, String function) {

    public Column {
        if (StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("Column name cannot be blank");
        }
    }

    @Override
    public String toString() {
        var column = new StringBuilder();
        if (StringUtils.isBlank(function) || "None".equals(function)) {
            column.append(name);
        } else {
            column.append(function)
                  .append("(")
                  .append(name)
                  .append(")");
        }
        if (StringUtils.isNotBlank(alias)) {
            column.append(" as ")
                  .append(alias);
        }
        return column.toString();
    }

}
