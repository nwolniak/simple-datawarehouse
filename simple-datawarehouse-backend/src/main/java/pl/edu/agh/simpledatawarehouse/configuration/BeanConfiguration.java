package pl.edu.agh.simpledatawarehouse.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.simpledatawarehouse.support.DatawarehouseMetadataExtractor;
import pl.edu.agh.simpledatawarehouse.support.MetadataExtractor;

@Configuration
public class BeanConfiguration {

    @Bean
    public MetadataExtractor metadataExtractor() {
        return new DatawarehouseMetadataExtractor();
    }

}
