package pl.edu.agh.simpledatawarehouse.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import pl.edu.agh.simpledatawarehouse.configuration.WebSecurityConfig;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryResult;
import pl.edu.agh.simpledatawarehouse.service.QueryService;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QueryController.class)
@Import(WebSecurityConfig.class)
class QueryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private QueryService queryService;

    @Test
    @WithMockUser
    void testQueryResultsSuccess() throws Exception {
        Mockito.doReturn(new QueryResult(List.of(), List.of(), StringUtils.EMPTY))
               .when(queryService)
               .executeQuery(any(QueryDto.class));
        mockMvc.perform(post("/simple-datawarehouse/query")
                                .contentType(APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(new QueryDto())))
               .andExpect(status().isOk())
               .andExpect(content().contentType(APPLICATION_JSON))
               .andExpect(content().json(new ObjectMapper().writeValueAsString(new QueryResult(List.of(), List.of(), StringUtils.EMPTY))));
    }

    @Test
    @WithMockUser
    void testQueryResultsFailed() throws Exception {
        Mockito.doThrow(new RuntimeException())
               .when(queryService)
               .executeQuery(any(QueryDto.class));

        mockMvc.perform(post("/simple-datawarehouse/query")
                                .contentType(APPLICATION_JSON)
                                .content(new ObjectMapper().writeValueAsString(new QueryDto())))
               .andExpect(status().isInternalServerError());
    }
}