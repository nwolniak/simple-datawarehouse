package pl.edu.agh.simpledatawarehouse.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import pl.edu.agh.simpledatawarehouse.model.dto.QueryDto;
import pl.edu.agh.simpledatawarehouse.model.query.Query;

@Mapper
public interface QueryMapper {

    QueryMapper INSTANCE = Mappers.getMapper(QueryMapper.class);

    @Mapping(target = "columns", source = "columns")
    @Mapping(target = "fromTable", source = "fromTable")
    @Mapping(target = "joins", source = "joins")
    @Mapping(target = "groupByList", source = "groupByList")
    @Mapping(target = "havingList", source = "havingList")
    @Mapping(target = "orderByList", source = "orderByList")
    Query toQuery(QueryDto queryDto);

}
