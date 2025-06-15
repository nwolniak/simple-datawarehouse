package pl.edu.agh.simpledatawarehouse.configuration;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import pl.edu.agh.simpledatawarehouse.service.ConnectionService;
import pl.edu.agh.simpledatawarehouse.service.DataSourceFactory;
import pl.edu.agh.simpledatawarehouse.support.DynamicDataSource;

@TestConfiguration
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
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
    @Primary
    public DynamicDataSource dynamicDataSource() {
        return new DynamicDataSource();
    }

}
