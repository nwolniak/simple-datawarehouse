package pl.edu.agh.simpledatawarehouse.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class DataRepository {

    private final JdbcClient jdbc;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public DataRepository(@Lazy DataSource dataSource) {
        this.jdbc = JdbcClient.create(dataSource);
    }

    public List<Map<String, Object>> execute(String sql) {
        var query = jdbc.sql(sql).query();
        return query.listOfRows();
    }

}
