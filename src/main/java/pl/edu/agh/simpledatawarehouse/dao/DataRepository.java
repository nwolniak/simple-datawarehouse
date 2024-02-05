package pl.edu.agh.simpledatawarehouse.dao;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class DataRepository {

    private final JdbcClient jdbc;

    public DataRepository(DataSource dataSource) {
        this.jdbc = JdbcClient.create(dataSource);
    }

    public void selectPrototype1(String table) {
        var sql = STR."""
                SELECT * FROM \{table}
                """;
        var query = jdbc.sql(sql).query();
        var results = query.listOfRows();
        results.forEach(System.out::println);
    }

    public void selectPrototype2(String table1, String table2) {
        var sql = STR."""
                SELECT *
                FROM \{table1}
                INNER JOIN \{table2} ON \{table1}.categoryid = \{table2}.categoryid
                """;
        var query = jdbc.sql(sql).query();
        var results = query.listOfRows();
        results.forEach(System.out::println);
    }

    public List<Map<String, Object>> selectPrototype3(String table1, String table2, String table3) {
        var sql = STR."""
                SELECT \{table2}.orderid, SUM(\{table3}.price) as total_price
                FROM \{table1}
                INNER JOIN \{table2} ON \{table1}.orderid = \{table2}.orderid
                INNER JOIN \{table3} ON \{table1}.productid = \{table3}.productid
                GROUP BY \{table2}.orderid
                ORDER BY total_price
                """;
        var query = jdbc.sql(sql).query();
        var results = query.listOfRows();
        return results;
    }

    public List<Map<String, Object>> execute(String sql) {
        var query = jdbc.sql(sql).query();
        return query.listOfRows();
    }

}
