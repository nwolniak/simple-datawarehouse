package pl.edu.agh.simpledatawarehouse.model.dto;

import lombok.*;

@Getter
@Setter
@Builder
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
