using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;
using Termin_5.Models;

namespace Termin_5.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<Subject, SubjectDto>().ReverseMap(); //Kazemo mu da mapira Subject na SubjectDto i obrnuto
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Deliverer, UserDto>().ReverseMap();
            CreateMap<Dish, DishDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Order, UnprocessedOrder>().ReverseMap();
            CreateMap<Order, OrderDisplayDto>().ReverseMap();
            CreateMap<Deliverer, DelivererDto>().ReverseMap();
        }
    }
}
