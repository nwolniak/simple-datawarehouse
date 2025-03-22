package pl.edu.agh.simpledatawarehouse.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Repository
public class TableRepository {

    private final DataSource dataSource;
    private final JdbcClient jdbc;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public TableRepository(@Lazy DataSource dataSource) {
        this.dataSource = dataSource;
        this.jdbc = JdbcClient.create(dataSource);
    }

    public List<Map<String, Object>> getTableRows(String tableName) {
        String sql = "select * from " + tableName;
        return jdbc.sql(sql)
                   .query()
                   .listOfRows();
    }

    public List<String> getTableColumns(String tableName) {
        try (Connection connection = dataSource.getConnection()) {
            ResultSet resultSet = connection.getMetaData()
                                            .getColumns(null, null, tableName, null);
            List<String> columnList = new LinkedList<>();
            while (resultSet.next()) {
                columnList.add(resultSet.getString("COLUMN_NAME"));
            }
            return columnList;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
