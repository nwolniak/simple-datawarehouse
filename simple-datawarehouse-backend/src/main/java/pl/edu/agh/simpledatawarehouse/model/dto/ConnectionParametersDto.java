package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConnectionParametersDto {
    private String driverClassName;
    private String driver;
    private String host;
    private String port;
    private String database;
    private String username;
    private String password;
}
