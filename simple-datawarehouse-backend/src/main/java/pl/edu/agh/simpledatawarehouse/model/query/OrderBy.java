package pl.edu.agh.simpledatawarehouse.model.query;

public record OrderBy(String columnName, boolean ascending) {
    @Override
    public String toString() {
        return STR."\{columnName} \{ascending ? "ASC" : "DESC"}";
    }
}

