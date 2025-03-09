package pl.edu.agh.simpledatawarehouse.configuration;

import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import pl.edu.agh.simpledatawarehouse.service.ConnectionService;
import pl.edu.agh.simpledatawarehouse.service.DataSourceFactory;

@TestConfiguration
public class ConnectionServiceTestConfiguration {

    @Bean
    public ConnectionService connectionService(DefaultListableBeanFactory beanFactory) {
        return new ConnectionService(dataSourceFactory(), beanFactory);
    }

    @Bean
    public DataSourceFactory dataSourceFactory() {
        return new DataSourceFactory();
    }

}
