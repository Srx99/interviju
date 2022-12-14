using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;
using Termin_5.Exceptions.Order;
using Termin_5.Infrastructure;
using Termin_5.Interfaces;
using Termin_5.Models;

namespace Termin_5.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly FacultyDbContext _dbContext;
        private static double Lat = 45.2399;
        private static double Lon = 19.8237;

        private static readonly Object _lock = new Object();

        public OrderService(IMapper mapper, FacultyDbContext dbContext)
        {
            this._mapper = mapper;
            this._dbContext = dbContext;
        }

        public OrderDto AcceptOrder(int ordersId, int deliverersId)
        {
            lock (_lock)
            {
                Order order = _dbContext.Orders.Find(ordersId);
                if (order == null)
                    throw new OrderNotFoundException($"Order with specified id {ordersId} doesn't exist.");

                order.DelivererId = deliverersId;
                order.Status = "inProcess";
                var date = DateTime.Now;
                order.Time = date.AddMinutes(1.0).ToString();

                _dbContext.SaveChanges();

                return _mapper.Map<OrderDto>(order);
            }
        }

        public TokenDto AddNewOrderToDb(OrderDto orderDto)
        {
            UserIdExist(orderDto.ClientId);

            if(orderDto.DelivererId == -1)
                orderDto.DelivererId = null;
            Order newOrder = _mapper.Map<Order>(orderDto);

            double tempLat = Lat;
            double tempLon = Lon;

            List<Order> orders = _dbContext.Orders.ToList();
            Random rand = new Random();

            int numOfOrders = orders.Count();
            int currOrderNum = ++numOfOrders;

            tempLat += currOrderNum * 0.0005;
            tempLon += currOrderNum * 0.0005;

            newOrder.Lat = tempLat;
            newOrder.Lon = tempLon;

            _dbContext.Orders.Add(newOrder);
            _dbContext.SaveChanges();

            TokenDto tokenDto = new TokenDto();
            tokenDto.Token = "Ok";

            return tokenDto;
        }

        private double NextDouble(Random rand, double minValue, double maxValue)
        {
            return rand.NextDouble() * (maxValue - minValue) + minValue;
        }

        public OrderDisplayDto FinishedOrder(int ordersId)
        {
            Order order = _dbContext.Orders.Find(ordersId);
            if (order == null)
                throw new OrderNotFoundException($"Order with specified id {ordersId} doesn't exist.");
            
            order.Status = "Done";
            _dbContext.SaveChanges();

            return _mapper.Map<OrderDisplayDto>(order);
        }

        public List<OrderDto> GetAllOrders()
        {
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders.ToList());
        }

        public List<UnprocessedOrder> GetUnprocessedOrders()
        {
            List<Order> orders = _dbContext.Orders.ToList();
            List<Order> orders1 = new List<Order>();

            foreach(Order o in orders.ToList())
            {
                if (o.Status == "Waiting")
                    orders1.Add(o);
            }
            List<UnprocessedOrder> orderDtos = _mapper.Map<List<UnprocessedOrder>>(orders1);

            return orderDtos;
        }

        public OrderDisplayDto RetriveDeliverersOrder(int deliverersId)
        {
            List<Order> orders = _dbContext.Orders.ToList();
            OrderDisplayDto orderDto = null;
            foreach(Order o in orders)
            {
                if (o.Status == "inProcess" && o.DelivererId == deliverersId)
                    orderDto = _mapper.Map<OrderDisplayDto>(o);
            }

            return orderDto;
        }

        private void UserIdExist(int userId)
        {
            if(_dbContext.Users.Find(userId) == null)
                throw new Exception($"User with id {userId} doesn't exist.");
        }

        public OrderDisplayDto ReturnOrderById(int ordersId)
        {
            OrderDisplayDto orderDto = _mapper.Map<OrderDisplayDto>(_dbContext.Orders.Find(ordersId));
            if (orderDto == null)
                throw new OrderNotFoundException($"Order with specified id {ordersId} doesn't exist. ");

            return orderDto;
        }

        public bool DelivererHasOrder(int deliverersId)
        {
            List<Order> orders = _dbContext.Orders.ToList();
            foreach (Order o in orders)
            {
                if (o.Status == "inProcess" && o.DelivererId == deliverersId)
                    return true;
            }
            return false;
        }
    }
}
