using api.DTO;
using api.Model;
using AutoMapper;

namespace api.Map;

public class CategoriaProfile : Profile
{
    public CategoriaProfile()
    {
        CreateMap<CategoriaDTO, Categoria>();
    }
}