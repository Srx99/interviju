using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;

namespace Termin_5.Interfaces
{
    public interface IDishService
    {
        DishDto AddNewDishToDataBase(DishDto dishDto);
        List<DishDto> GetAllDishesFromDataBase();
        TokenDto DeleteDish(DishDto dishDto);
    }
}
