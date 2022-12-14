using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;

namespace Termin_5.Interfaces
{
    public interface IOrderService
    {
        TokenDto AddNewOrderToDb(OrderDto orderDto);
        List<OrderDto> GetAllOrders();
        List<UnprocessedOrder> GetUnprocessedOrders();
        OrderDto AcceptOrder(int ordersId, int deliverersId);

        OrderDisplayDto RetriveDeliverersOrder(int deliverersId);
        bool DelivererHasOrder(int deliverersId);

        OrderDisplayDto FinishedOrder(int ordersId);

        OrderDisplayDto ReturnOrderById(int ordersId);
    }
}
