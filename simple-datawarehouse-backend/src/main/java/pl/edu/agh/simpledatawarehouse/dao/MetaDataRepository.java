package pl.edu.agh.simpledatawarehouse.dao;

import lombok.SneakyThrows;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import pl.edu.agh.simpledatawarehouse.model.metadata.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Repository
public class MetaDataRepository {

    private final JdbcTemplate jdbc;

    public MetaDataRepository(@Lazy DataSource dataSource) {
        this.jdbc = new JdbcTemplate(dataSource);
    }

    @SneakyThrows
    public String getDatabase() {
        try (Connection connection = jdbc.getDataSource()
                                         .getConnection()) {
            var metaData = connection.getMetaData();
            return metaData.getDatabaseProductName();
        }
    }

    @SneakyThrows
    public String getURL() {
        try (Connection connection = jdbc.getDataSource()
                                         .getConnection()) {
            var metaData = connection.getMetaData();
            return metaData.getURL();
        }
    }

    @SneakyThrows
    public List<TableMetadata> getTablesMetadata() {
        List<TableMetadata> tablesMetadata = new ArrayList<>();
        try (Connection connection = jdbc.getDataSource()
                                         .getConnection()) {
            var metaData = connection.getMetaData();
            var resultSet = metaData.getTables(null, null, null, new String[]{"TABLE"});
            while (resultSet.next()) {
                String table = resultSet.getString("TABLE_NAME");
                var tableMetadata = TableMetadata.builder()
                                                 .tableName(table)
                                                 .columnsMetadata(getColumnsMetadata(metaData, table))
                                                 .primaryKeysMetadata(getPrimaryKeysMetadata(metaData, table))
                                                 .foreignKeysMetadata(getForeignKeysMetadata(metaData, table))
                                                 .build();
                tablesMetadata.add(tableMetadata);
            }
        }
        return tablesMetadata;
    }

    @SneakyThrows
    public List<ColumnMetadata> getColumnsMetadata(DatabaseMetaData metaData, String table) {
        List<ColumnMetadata> columnsMetadata = new LinkedList<>();
        var resultSet = metaData.getColumns(null, null, table, null);
        while (resultSet.next()) {
            var columnMetadata = ColumnMetadata.builder()
                                               .name(resultSet.getString("COLUMN_NAME"))
                                               .size(resultSet.getString("COLUMN_SIZE"))
                                               .type(resultSet.getString("TYPE_NAME"))
                                               .isNullable(resultSet.getBoolean("IS_NULLABLE"))
                                               .isAutoincrement(resultSet.getBoolean("IS_AUTOINCREMENT"))
                                               .build();
            columnsMetadata.add(columnMetadata);
        }
        return columnsMetadata;
    }

    @SneakyThrows
    private List<PrimaryKeyMetadata> getPrimaryKeysMetadata(DatabaseMetaData metaData, String table) {
        List<PrimaryKeyMetadata> primaryKeysMetadata = new LinkedList<>();
        var resultSet = metaData.getPrimaryKeys(null, null, table);
        while (resultSet.next()) {
            var primaryKeyMetadata = PrimaryKeyMetadata.builder()
                                                       .columnName(resultSet.getString("COLUMN_NAME"))
                                                       .primaryKeyName(resultSet.getString("PK_NAME"))
                                                       .build();
            primaryKeysMetadata.add(primaryKeyMetadata);
        }
        return primaryKeysMetadata;
    }

    @SneakyThrows
    private List<ForeignKeyMetadata> getForeignKeysMetadata(DatabaseMetaData metaData, String table) {
        List<ForeignKeyMetadata> foreignKeysMetadata = new LinkedList<>();
        var resultSet = metaData.getImportedKeys(null, null, table);
        while (resultSet.next()) {
            var primaryKeyMetadata = ForeignKeyMetadata.builder()
                                                        .foreignKeyName(resultSet.getString("FK_NAME"))
                                                       .primaryKeyTableName(resultSet.getString("PKTABLE_NAME"))
                                                       .primaryKeyColumnName(resultSet.getString("PKCOLUMN_NAME"))
                                                       .foreignKeyTableName(resultSet.getString("FKTABLE_NAME"))
                                                       .foreignKeyColumnName(resultSet.getString("FKCOLUMN_NAME"))
                                                       .build();
            foreignKeysMetadata.add(primaryKeyMetadata);
        }
        return foreignKeysMetadata;
    }

}
