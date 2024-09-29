package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Component;
import pl.edu.agh.simpledatawarehouse.exceptions.DatabaseConnectionException;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;
import pl.edu.agh.simpledatawarehouse.events.DatabaseConnectionEvent;

import java.sql.SQLException;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseConnectionListener {

    private static final String DATA_SOURCE = "datasource";
    private final DefaultListableBeanFactory beanFactory;

    @EventListener
    public void handleDatabaseConnectionEvent(DatabaseConnectionEvent event) {
        var source = (ConnectionParametersDto) event.getSource();
        var dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(source.getDriverClassName());
        dataSource.setUrl(STR."jdbc:\{source.getDriver()}://\{source.getHost()}:\{source.getPort()}/\{source.getDatabase()}");
        dataSource.setUsername(source.getUsername());
        dataSource.setPassword(source.getPassword());
        try (var connection = dataSource.getConnection()) {
            if (!connection.isValid(3)) {
                return;
            }
        } catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        var dataSourceBean = BeanDefinitionBuilder.genericBeanDefinition(DriverManagerDataSource.class, () -> dataSource).getBeanDefinition();
        if (beanFactory.containsBeanDefinition(DATA_SOURCE)) {
            beanFactory.removeBeanDefinition(DATA_SOURCE);
        }
        beanFactory.registerBeanDefinition(DATA_SOURCE, dataSourceBean);
    }

}
