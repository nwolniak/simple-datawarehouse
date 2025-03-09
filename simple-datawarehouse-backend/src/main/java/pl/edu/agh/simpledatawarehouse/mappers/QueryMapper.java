package pl.edu.agh.simpledatawarehouse.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.query.Query;

@Mapper(componentModel = "spring")
public interface QueryMapper {

    @Mapping(target = "columnList", source = "columnList")
    @Mapping(target = "table", source = "table")
    @Mapping(target = "joinList", source = "joinList")
    @Mapping(target = "whereList", source = "whereList")
    @Mapping(target = "groupByList", source = "groupByList")
    @Mapping(target = "havingList", source = "havingList")
    @Mapping(target = "orderByList", source = "orderByList")
    Query toQuery(QueryDto queryDto);

}
