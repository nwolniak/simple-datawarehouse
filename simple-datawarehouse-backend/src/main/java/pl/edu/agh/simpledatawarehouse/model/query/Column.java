package pl.edu.agh.simpledatawarehouse.model.query;

import org.apache.commons.lang3.StringUtils;

public record Column(String name, String alias, String function) {

    @Override
    public String toString() {
        var column = new StringBuilder();
        if (StringUtils.isBlank(function) || "None".equals(function)) {
            column.append(name);
        } else {
            column.append(STR."\{function}(\{name})");
        }
        if (StringUtils.isNotBlank(alias)) {
            column.append(STR." AS \{alias}");
        }
        return column.toString();
    }

}
