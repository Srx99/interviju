using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;

namespace Termin_5.Interfaces
{
    public interface IUserService
    {
        TokenDto AddNewUserToDataBase(UserDto user);
        TokenDto loginGoogle(UserDto user);
        List<UserDto> GettAllUsersFromDataBase();
        TokenDto Login(LoginDto dto);
        UserDto GetUserByEmail(string email);
        UserDto EditUserInDb(UserDto user);
        List<DelivererDisplayDto> GetUnprocessedDeliverers();
        UserDto EditDeliverer(DelivererDisplayDto deliverer);
        List<DelivererDisplayDto> GetAllDeliverers();
        TokenDto FindUsersId(string email);
       // List<OrderDto> RetriveAllPreviousOrders(string email);
        List<OrderDto> RetriveAllPreviousOrders(int id);
        List<OrderDto> RetriveCurrentOrders(string email);
        int FindDeliverersId(string email);
        TokenDto DeliverersInProcessOrder(string email);
        List<OrderDisplayDto> PreviousDeliverersOrders(int id);
        DelivererDto GetDelivererById(int id);
        TokenDto UploadImage(IFormFile formFile, int userId, string typeOfUser);
        FileStream ReadImage(int userId, string imageURL, string typeOfUser);
    }
}
