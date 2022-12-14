using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;
using Termin_5.Exceptions.Dish;
using Termin_5.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Termin_5.Controllers
{
    [Route("api/dishes")]
    [ApiController]
    public class DishController : ControllerBase
    {
        private readonly IDishService _dishService;

        public DishController(IDishService dishService)
        {
            this._dishService = dishService;
        }

        [HttpPost("newDish")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddNewDish([FromBody] DishDto dishDto)
        {
            return Ok(_dishService.AddNewDishToDataBase(dishDto));
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_dishService.GetAllDishesFromDataBase());
        }

        [HttpPost("deleteDish")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteDish([FromBody] DishDto dishDto)
        {
            try
            {
                TokenDto tokenDto = _dishService.DeleteDish(dishDto);
                return Ok(tokenDto);
            }
            catch(DishNotFoundException m)
            {
                return NotFound(m.Message);
            }
        }
    }
}
