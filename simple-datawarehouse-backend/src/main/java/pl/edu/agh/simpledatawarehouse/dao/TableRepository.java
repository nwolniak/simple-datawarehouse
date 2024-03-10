package pl.edu.agh.simpledatawarehouse.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class TableRepository {

    private final JdbcClient jdbc;

    public TableRepository(@Lazy DataSource dataSource) {
        this.jdbc = JdbcClient.create(dataSource);
    }

    public List<Map<String, Object>> getTableRows(String sql) {
        return jdbc.sql(sql)
                .query()
                .listOfRows();
    }

}
