package pl.edu.agh.simpledatawarehouse.service;

import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Component;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;

import javax.sql.DataSource;

@Component
public class DataSourceFactory {

    public DataSource createDataSource(ConnectionParametersDto parameters) {
        var dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(parameters.getDriverClassName());
        dataSource.setUrl(createConnectionString(parameters));
        dataSource.setUsername(parameters.getUsername());
        dataSource.setPassword(parameters.getPassword());
        return dataSource;
    }

    private static String createConnectionString(ConnectionParametersDto parameters) {
        return "jdbc:" + parameters.getDriver() + "://" + parameters.getHost() + ":" + parameters.getPort() + "/" + parameters.getDatabase();
    }

}
