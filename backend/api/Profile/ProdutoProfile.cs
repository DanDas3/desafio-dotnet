using api.DTO;
using api.Model;
using AutoMapper;

namespace api.Map;

public class ProdutoProfile : Profile
{
    public ProdutoProfile()
    {
        CreateMap<ProdutoDTO,Produto>();
    }
}