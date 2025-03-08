package pl.edu.agh.simpledatawarehouse.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import pl.edu.agh.simpledatawarehouse.configuration.WebSecurityConfig;
import pl.edu.agh.simpledatawarehouse.exceptions.DatabaseConnectionException;
import pl.edu.agh.simpledatawarehouse.model.dto.ConnectionParametersDto;
import pl.edu.agh.simpledatawarehouse.service.ConnectionService;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ConnectionController.class)
@Import({WebSecurityConfig.class})
class ConnectionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ConnectionService connectionService;

    @Test
    @WithMockUser
    void testConnectToDatabaseSuccess() throws Exception {
        Mockito.doNothing()
               .when(connectionService)
               .tryConnectToDatabase(any(ConnectionParametersDto.class));

        mockMvc.perform(post("/simple-datawarehouse/connect")
                                .contentType(APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(new ConnectionParametersDto())))
               .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testConnectToDatabaseFailed() throws Exception {
        Mockito.doThrow(new DatabaseConnectionException())
               .when(connectionService)
               .tryConnectToDatabase(any(ConnectionParametersDto.class));

        mockMvc.perform(post("/simple-datawarehouse/connect")
                                .contentType(APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(new ConnectionParametersDto())))
               .andExpect(status().isInternalServerError());
    }
}