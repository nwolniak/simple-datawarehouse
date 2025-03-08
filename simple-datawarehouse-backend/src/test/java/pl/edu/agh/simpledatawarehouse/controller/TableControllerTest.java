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
import pl.edu.agh.simpledatawarehouse.model.dto.TableDto;
import pl.edu.agh.simpledatawarehouse.service.TableService;

import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TableController.class)
@Import(WebSecurityConfig.class)
class TableControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TableService tableService;

    @Test
    @WithMockUser
    void testGetTableSuccess() throws Exception {
        Mockito.doReturn(new TableDto())
               .when(tableService)
               .getTable(anyString());

        mockMvc.perform(get("/simple-datawarehouse/tables/tableName"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(APPLICATION_JSON))
               .andExpect(content().json(new ObjectMapper().writeValueAsString(new TableDto())));
    }

    @Test
    @WithMockUser
    void testGetTableFailed() throws Exception {
        Mockito.doThrow(new RuntimeException())
               .when(tableService)
               .getTable(anyString());

        mockMvc.perform(get("/simple-datawarehouse/tables/tableName"))
               .andExpect(status().isInternalServerError());
    }
}