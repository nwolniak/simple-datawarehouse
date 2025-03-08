package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.exceptions.DatabaseConnectionException;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;

import java.sql.SQLException;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private static final String DATA_SOURCE = "datasource";
    private static final int TIMEOUT = 3;

    private final DefaultListableBeanFactory beanFactory;

    public void tryConnectToDatabase(ConnectionParametersDto parameters) {
        var dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(parameters.getDriverClassName());
        dataSource.setUrl(createConnectionString(parameters));
        dataSource.setUsername(parameters.getUsername());
        dataSource.setPassword(parameters.getPassword());
        try (var connection = dataSource.getConnection()) {
            if (connection.isValid(TIMEOUT)) {
                registerDataSourceBean(dataSource);
            } else {
                throw new DatabaseConnectionException("Database connection failed");
            }
        } catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
    }

    private void registerDataSourceBean(DriverManagerDataSource dataSource) {
        var dataSourceBean = BeanDefinitionBuilder
                .genericBeanDefinition(DriverManagerDataSource.class, () -> dataSource)
                .getBeanDefinition();
        if (beanFactory.containsBeanDefinition(DATA_SOURCE)) {
            beanFactory.removeBeanDefinition(DATA_SOURCE);
        }
        beanFactory.registerBeanDefinition(DATA_SOURCE, dataSourceBean);
    }

    private String createConnectionString(ConnectionParametersDto parameters) {
        return "jdbc:" + parameters.getDriver() + "://" + parameters.getHost() + ":" + parameters.getPort() + "/" + parameters.getDatabase();
    }

}
