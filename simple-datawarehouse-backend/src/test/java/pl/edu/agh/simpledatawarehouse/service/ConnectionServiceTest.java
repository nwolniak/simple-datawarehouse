package pl.edu.agh.simpledatawarehouse.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import pl.edu.agh.simpledatawarehouse.configuration.ConnectionServiceTestConfiguration;
import pl.edu.agh.simpledatawarehouse.exceptions.DatabaseConnectionException;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLTimeoutException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@ContextConfiguration(classes = ConnectionServiceTestConfiguration.class)
class ConnectionServiceTest {

    @Autowired
    private ConnectionService connectionService;

    @MockitoBean
    private DataSourceFactory dataSourceFactory;

    @Autowired
    private DefaultListableBeanFactory beanFactory;

    @Mock
    private DataSource dataSource1;

    @Mock
    private DataSource dataSource2;

    @Mock
    private Connection connection;

    private ConnectionParametersDto connectionParameters;

    @BeforeEach
    void setUp() {
        this.connectionParameters = new ConnectionParametersDto();
    }

    @Test
    void tryConnectToDatabaseSuccess() throws SQLException {
        Mockito.doReturn(true)
               .when(connection)
               .isValid(Mockito.anyInt());
        Mockito.doReturn(connection)
               .when(dataSource1)
               .getConnection();
        Mockito.doReturn(dataSource1)
               .when(dataSourceFactory)
               .createDataSource(connectionParameters);

        connectionService.tryConnectToDatabase(connectionParameters);

        assertThat(beanFactory.getBean("datasource")).isSameAs(dataSource1);
    }

    @Test
    void tryConnectToDatabaseWithNewDatasource() throws SQLException {
        Mockito.doReturn(true)
               .when(connection)
               .isValid(Mockito.anyInt());
        Mockito.doReturn(connection)
               .when(dataSource2)
               .getConnection();
        Mockito.doReturn(dataSource2)
               .when(dataSourceFactory)
               .createDataSource(connectionParameters);

        beanFactory.registerSingleton("datasource", dataSource1);

        connectionService.tryConnectToDatabase(connectionParameters);

        assertThat(beanFactory.getBean("datasource")).isSameAs(dataSource2);
    }

    @Test
    void tryConnectToDatabaseWhenLoginTimedOut() throws SQLException {
        Mockito.doThrow(SQLTimeoutException.class)
               .when(dataSource1)
               .getConnection();
        Mockito.doReturn(dataSource1)
               .when(dataSourceFactory)
               .createDataSource(connectionParameters);

        assertThrows(DatabaseConnectionException.class, () -> {
            connectionService.tryConnectToDatabase(connectionParameters);
        });
    }

    @Test
    void tryConnectToDatabaseWhenValidationTimedOut() throws SQLException {
        Mockito.doReturn(false)
               .when(connection)
               .isValid(Mockito.anyInt());
        Mockito.doReturn(connection)
               .when(dataSource1)
               .getConnection();
        Mockito.doReturn(dataSource1)
               .when(dataSourceFactory)
               .createDataSource(connectionParameters);

        assertThrows(DatabaseConnectionException.class, () -> {
            connectionService.tryConnectToDatabase(connectionParameters);
        });
    }

    @Test
    void tryConnectToDatabaseWhenConnectionInvalid() throws SQLException {
        Mockito.doThrow(SQLException.class)
               .when(dataSource1)
               .getConnection();
        Mockito.doReturn(dataSource1)
               .when(dataSourceFactory)
               .createDataSource(connectionParameters);

        assertThrows(DatabaseConnectionException.class, () -> {
            connectionService.tryConnectToDatabase(connectionParameters);
        });
    }
}