package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.exceptions.DatabaseConnectionException;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;
import pl.edu.agh.simpledatawarehouse.support.DynamicDataSource;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.sql.SQLTimeoutException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConnectionService {

    private static final int VALIDATION_TIMEOUT = 3;

    private final DataSourceFactory dataSourceFactory;
    private final DynamicDataSource dynamicDataSource;

    public void tryConnectToDatabase(ConnectionParametersDto parameters) {
        var datasource = dataSourceFactory.createDataSource(parameters);
        if (canEstablishConnection(datasource)) {
            dynamicDataSource.setDataSource(datasource);
        } else {
            throw new DatabaseConnectionException("Can't establish connection");
        }
    }

    private boolean canEstablishConnection(DataSource datasource) {
        try (var connection = datasource.getConnection()) {
            return connection.isValid(VALIDATION_TIMEOUT);
        } catch (SQLTimeoutException e) {
            throw new DatabaseConnectionException("Database connection timed out");
        } catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
    }

}
