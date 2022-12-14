using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;
using Termin_5.Exceptions.Dish;
using Termin_5.Infrastructure;
using Termin_5.Interfaces;
using Termin_5.Models;

namespace Termin_5.Services
{
    public class DishService : IDishService
    {
        private readonly IMapper _mapper;
        private readonly FacultyDbContext _dbContext;

        public DishService(IMapper mapper, FacultyDbContext dbContext)
        {
            this._mapper = mapper;
            this._dbContext = dbContext;
        }

        public DishDto AddNewDishToDataBase(DishDto dishDto)
        {
            Dish newDish = _mapper.Map<Dish>(dishDto);
            _dbContext.Dishes.Add(newDish);
            _dbContext.SaveChanges();

            return _mapper.Map<DishDto>(dishDto);
        }

        public TokenDto DeleteDish(DishDto dishDto)
        {
            Dish dish = _mapper.Map<Dish>(dishDto);
            if (dish == null)
                throw new DishNotFoundException($"Dish with this id doesn't exist");
            _dbContext.Dishes.Remove(dish);
            _dbContext.SaveChanges();
            TokenDto token = new TokenDto();
            token.Token = "OK";
            return token;
            
        }

        public List<DishDto> GetAllDishesFromDataBase()
        {
            return _mapper.Map<List<DishDto>>(_dbContext.Dishes.ToList());
        }
    }
}
