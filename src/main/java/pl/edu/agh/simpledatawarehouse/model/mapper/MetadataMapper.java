package pl.edu.agh.simpledatawarehouse.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public class MetadataMapper {

    MetadataMapper INSTANCE = Mappers.getMapper(MetadataMapper.class);

}
