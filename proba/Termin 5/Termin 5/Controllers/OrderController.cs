using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;
using Termin_5.Exceptions.Order;
using Termin_5.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Termin_5.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("addNewOrder")]
        [Authorize(Roles = "Customer")]
        public IActionResult AddNewOrderToBb([FromBody] OrderDto orderDto)
        {
            return Ok(_orderService.AddNewOrderToDb(orderDto));
        }

        [HttpGet("getAllOrders")]
        [Authorize(Roles = "Customer, Admin, Deliverer")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetAllOrders());
        }

        [HttpGet("unprocessedOrders")]
        [Authorize(Roles = "Customer, Admin, Deliverer")]
        public IActionResult GetUnporcessedOrders()
        {
            return Ok(_orderService.GetUnprocessedOrders());
        }

        [HttpGet("acceptOrder/{ordersId}/{deliverersId}")]
        [Authorize(Roles = "Admin, Deliverer")]
        public IActionResult AcceptOrder(int ordersId, int deliverersId)
        {
            try
            {
                OrderDto orderDto = _orderService.AcceptOrder(ordersId, deliverersId);
                return Ok(orderDto);
            }
            catch(OrderNotFoundException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("deliverersCurrentOrder/{deliverersId}")]
        [Authorize(Roles = "Admin, Deliverer")]
        public IActionResult DeliverersCurrentOrder(int deliverersId)
        {
            return Ok(_orderService.RetriveDeliverersOrder(deliverersId));
        }

        [HttpGet("finishedOrder/{ordersId}")]
        [Authorize(Roles = "Deliverer")]
        public IActionResult FinishedOrder(int ordersId)
        {           
            try
            {
                OrderDisplayDto orderDisplayDto = _orderService.FinishedOrder(ordersId);
                return Ok(orderDisplayDto);
            }
            catch (OrderNotFoundException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("getOrderById/{id}")]
        public IActionResult GetOrderById(int id)
        {           
            try
            {
                OrderDisplayDto orderDisplayDto = _orderService.ReturnOrderById(id);
                return Ok(orderDisplayDto);
            }
            catch (OrderNotFoundException m)
            {
                return NotFound(m.Message);
            }
        }

        [HttpGet("delivererHasOrder/{id}")]
        public IActionResult DelivererHasOrder(int id)
        {
            return Ok(_orderService.DelivererHasOrder(id));
        }
    }
}
