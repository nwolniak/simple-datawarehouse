package pl.edu.agh.simpledatawarehouse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.simpledatawarehouse.dao.DataRepository;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QueryService {

    private final DataRepository dataRepository;

    public List<Map<String, Object>> queryResults(final QueryDto queryDto) {
        String sql = queryDto.getSql();
        return dataRepository.execute(sql);
    }

}
