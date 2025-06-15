package pl.edu.agh.simpledatawarehouse.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.simpledatawarehouse.support.DynamicDataSource;

@Configuration
public class BeanConfiguration {

    @Bean
    public DynamicDataSource dataSource() {
        return new DynamicDataSource();
    }

}
