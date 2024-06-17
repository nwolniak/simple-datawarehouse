package pl.edu.agh.simpledatawarehouse.events;

import org.springframework.context.ApplicationEvent;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;

public class DatabaseConnectionEvent extends ApplicationEvent {

    public DatabaseConnectionEvent(ConnectionParametersDto connectionParametersDto) {
        super(connectionParametersDto);
    }

}