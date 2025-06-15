package pl.edu.agh.simpledatawarehouse.configuration;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import pl.edu.agh.simpledatawarehouse.service.ConnectionService;
import pl.edu.agh.simpledatawarehouse.service.DataSourceFactory;
import pl.edu.agh.simpledatawarehouse.support.DynamicDataSource;

@TestConfiguration
public class ConnectionServiceTestConfiguration {

    @Bean
    public ConnectionService connectionService() {
        return new ConnectionService(dataSourceFactory(), dynamicDataSource());
    }

    @Bean
    public DataSourceFactory dataSourceFactory() {
        return new DataSourceFactory();
    }

    @Bean
    public DynamicDataSource dynamicDataSource() {
        return new DynamicDataSource();
    }

}
