package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.exceptions.DatabaseConnectionException;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.sql.SQLTimeoutException;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private static final String DATA_SOURCE = "datasource";
    private static final int VALIDATION_TIMEOUT = 3;

    private final DataSourceFactory dataSourceFactory;
    private final DefaultListableBeanFactory beanFactory;

    public void tryConnectToDatabase(ConnectionParametersDto parameters) throws SQLException {
        var datasource = dataSourceFactory.createDataSource(parameters);
        if (canEstablishConnection(datasource)) {
            registerDataSourceBean(datasource);
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

    private void registerDataSourceBean(DataSource dataSource) {
        if (beanFactory.containsBean(DATA_SOURCE)) {
            beanFactory.destroySingleton(DATA_SOURCE);
        }
        beanFactory.registerSingleton(DATA_SOURCE, dataSource);
    }
}
