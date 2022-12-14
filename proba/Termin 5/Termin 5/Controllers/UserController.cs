using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;
using Termin_5.Exceptions.User;
using Termin_5.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Termin_5.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost]
        public IActionResult AddNewUser([FromBody] UserDto user)
        {
            try
            {
                TokenDto tokenDto = _userService.AddNewUserToDataBase(user);
                return Ok(tokenDto);
            }
            catch (UserAlreadyExistsException mm)
            {
                return NotFound(mm.Message);
            }
        }

        [HttpPost("google")]
        public IActionResult LoginGoogle([FromBody] UserDto user)
        {
                TokenDto tokenDto = _userService.loginGoogle(user);
                return Ok(tokenDto);
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_userService.GettAllUsersFromDataBase());
        }

        [HttpPost("login")]
        public IActionResult Post([FromBody] LoginDto dto)
        {
            return Ok(_userService.Login(dto));
        }

        [HttpGet("{email}")]
        public IActionResult Post(string email)
        {
            try
            {
                UserDto userDto = _userService.GetUserByEmail(email);
                return Ok(userDto);
            }
            catch (UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpPost("edit")]
        public IActionResult EditUserInDb([FromBody] UserDto user)
        {
            return Ok(_userService.EditUserInDb(user));
        }

        [HttpGet("unprocessedDeliverers")]
        public IActionResult UnprocessedDeliverers()
        {
            return Ok(_userService.GetUnprocessedDeliverers());
        }


        [HttpPost("editDeliverer")]
        public IActionResult EditDeliverer([FromBody] DelivererDisplayDto deliverer)
        {
            return Ok(_userService.EditDeliverer(deliverer));
        }

        [HttpGet("allDeliverers")]
        public IActionResult GetAllDeliverers()
        {
            return Ok(_userService.GetAllDeliverers());
        }

        [HttpGet("findUsersId/{email}")]
        public IActionResult FindUsersId(string email)
        {
            try
            {
                TokenDto tokenDto = _userService.FindUsersId(email);
                return Ok(tokenDto);
            }
            catch(UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("usersOrders/{id}")]
        public IActionResult RetrivePreviousOrders(int id)
        {            
            try
            {
                List<OrderDto> orders = _userService.RetriveAllPreviousOrders(id);
                return Ok(orders);
            }
            catch(UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("currentOrders/{email}")]
        public IActionResult RetriveCurrentOrders(string email)
        {
            try
            {
                List<OrderDto> orders = _userService.RetriveCurrentOrders(email);
                return Ok(orders);
            }
            catch(UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("findDeliverersId/{email}")]
        public IActionResult FindDeliverersId(string email)
        {
            try
            {
                int i = _userService.FindDeliverersId(email);
                return Ok(i);
            }
            catch(UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("delivererHasInProcessOrder/{email}")]
        public IActionResult DelivererHasInProcessOrder(string email)
        {
            try
            {
                TokenDto token = _userService.DeliverersInProcessOrder(email);
                return Ok(token);
            }
            catch(UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("previousDeliverersOrders/{id}")]
        [Authorize(Roles = "Admin, Deliverer")]

        public IActionResult PreviousDeliverersOrders(int id)
        {
            try
            {
                List<OrderDisplayDto> orderDisplayDtos = _userService.PreviousDeliverersOrders(id);
                return Ok(orderDisplayDtos);
            }
            catch(DelivererNotFoundException d)
            {
                return NotFound(d.Message);
            }
        }

        [HttpPost("uploacPicture/{id}/{typeOfUser}")]
        public IActionResult UploadPicture(int id, string typeOfUser, IFormFile file)
        {
            try
            {
                TokenDto tokenDto = _userService.UploadImage(file, id, typeOfUser);
                return Ok(tokenDto);
            }
            catch(UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("readImage/{userId}/{fileName}/{typeOfUser}")]
        public IActionResult ReadImage(int userId, string fileName, string typeOfUser)
        {           
            try
            {
                FileStream stream = _userService.ReadImage(userId, fileName, typeOfUser);
                return File(stream, "application/octet-stream", fileName);
            }
            catch(UserNotFountException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("getDelivererById/{id}")]
        public IActionResult GetDelivererById(int id)
        {
            return Ok(_userService.GetDelivererById(id));
        }

    }
}
