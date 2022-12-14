using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Dto;
using Termin_5.Infrastructure;
using Termin_5.Interfaces;
using Termin_5.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using Termin_5.Exceptions.User;

namespace Termin_5.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly FacultyDbContext _dbContext;
        private readonly IConfigurationSection _secretKey;

        public UserService(IMapper mapper, FacultyDbContext dbContext, IConfiguration config)
        {
            this._mapper = mapper;
            this._dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }

        public TokenDto AddNewUserToDataBase(UserDto user) 
        {
            TokenDto token = new TokenDto();
          
            if (user.TypeOfUser == "Deliverer")
            {
                Deliverer delUsernameExists = _dbContext.Deliverers.Where(x => x.Username == user.Username).FirstOrDefault();
                if (delUsernameExists != null)
                    throw new UserAlreadyExistsException($"User with specified username {user.Username} aleady exists.");
                
                Deliverer delEmailExists = _dbContext.Deliverers.Where(x => x.Email == user.Email).FirstOrDefault();
                if (delEmailExists != null)
                    throw new UserAlreadyExistsException($"User with specified email {user.Email} aleady exists.");

                Deliverer newUserd = _mapper.Map<Deliverer>(user);
                newUserd.Password = BCrypt.Net.BCrypt.HashPassword(newUserd.Password);
                if (newUserd.ImageURL == "")
                    newUserd.ImageURL = null;
                _dbContext.Deliverers.Add(newUserd);
                _dbContext.SaveChanges();

                List<Deliverer> deliverers = _dbContext.Deliverers.ToList();
                foreach (Deliverer u in deliverers)
                {
                    if (u.Email == user.Email)
                    {
                        token.Token = u.Id.ToString();
                        break;
                    }
                }
            }
            else
            {
                User newUser = _mapper.Map<User>(user);
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                if (newUser.ImageURL == "")
                    newUser.ImageURL = null;
                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();

                List<User> users = _dbContext.Users.ToList();
                foreach (User u in users)
                {
                    if (u.Email == user.Email)
                    {
                        token.Token = u.Id.ToString();
                        break;
                    }
                }
            }            
            return token;
        }

        public TokenDto loginGoogle(UserDto user)
        {
            TokenDto token = new TokenDto();
            User usr = _dbContext.Users.Where(x => x.Email == user.Email).FirstOrDefault();

            if (usr == null)
            {

                User newUser = _mapper.Map<User>(user);
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                if (newUser.ImageURL == "")
                    newUser.ImageURL = null;
                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();

                usr = _dbContext.Users.Where(x => x.Email == user.Email).FirstOrDefault();
               
            }
            if (!BCrypt.Net.BCrypt.Verify("guglsifra", usr.Password))
            {
                token.Token = "vec postoji";
                return token;
            }

            LoginDto dto = new LoginDto();
            dto.Email = user.Email;
            dto.Password = user.Password;

            List<Claim> claims = new List<Claim>();
            
            claims.Add(new Claim(ClaimTypes.Role, "Customer"));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, usr.Id.ToString()));

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
               issuer: "http://localhost:44388", //url servera koji je izdao token
               claims: claims, //claimovi
               expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
               signingCredentials: signinCredentials //kredencijali za potpis
           );

            
            token.Token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return token;

        }

        public List<UserDto> GettAllUsersFromDataBase() 
        {
            List<UserDto> users = _mapper.Map<List<UserDto>>(_dbContext.Users.ToList());
            List<UserDto> deliverers = _mapper.Map<List<UserDto>>(_dbContext.Deliverers.ToList());
            List<UserDto> all = new List<UserDto>();
            all.AddRange(users);
            all.AddRange(deliverers);
            return all;
        }

        public TokenDto Login(LoginDto dto) 
        {           
            List<UserDto> users = _mapper.Map<List<UserDto>>(_dbContext.Users.ToList());
            List<UserDto> deliverers = _mapper.Map<List<UserDto>>(_dbContext.Deliverers.ToList());
            User user = new User();
            user = null;
            foreach(UserDto u in users)
            {
                if (u.Email == dto.Email)
                    user = _mapper.Map<User>(u);
            }           

            if(user != null)
            {
                if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                {
                    List<Claim> claims = new List<Claim>();
                    if (user.TypeOfUser == "Admin")
                        claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                    //if (user.TypeOfUser == "Deliverer")
                    //    claims.Add(new Claim(ClaimTypes.Role, "Deliverer"));
                    if (user.TypeOfUser == "Customer")
                        claims.Add(new Claim(ClaimTypes.Role, "Customer"));
                    claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                       issuer: "http://localhost:44388", //url servera koji je izdao token
                       claims: claims, //claimovi
                       expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                       signingCredentials: signinCredentials //kredencijali za potpis
                   );

                    TokenDto token = new TokenDto();
                    token.Token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return token;
                }
                else                
                    return null;                
            }
            else
            {
                Deliverer deliverer = new Deliverer();
                deliverer = null;
                foreach (UserDto d in deliverers)
                {
                    if (d.Email == dto.Email)
                        deliverer = _mapper.Map<Deliverer>(d);
                }

                if (deliverer != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(dto.Password, deliverer.Password))
                    {                        
                        List<Claim> claims = new List<Claim>();
                        //if (deliverer.TypeOfUser == "Admin")
                        //    claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                        if (deliverer.TypeOfUser == "Deliverer")
                            claims.Add(new Claim(ClaimTypes.Role, "Deliverer"));
                        //if (user.TypeOfUser == "Customer")
                        //    claims.Add(new Claim(ClaimTypes.Role, "Customer"));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, deliverer.Id.ToString()));

                        SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                        var tokeOptions = new JwtSecurityToken(
                           issuer: "http://localhost:44388", //url servera koji je izdao token
                           claims: claims, //claimovi
                           expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                           signingCredentials: signinCredentials //kredencijali za potpis
                       );

                        TokenDto token = new TokenDto();
                        token.Token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                        return token;
                    }
                    else                    
                        return null;                    
                }
                else                                    
                    return null;                
            }
        }

        public UserDto GetUserByEmail(string email) 
        {
            User usr = _dbContext.Users.Where(x => x.Email == email).FirstOrDefault();
            if (usr == null)
                throw new UserNotFountException($"User with specified email {email} doesn't exist.");

            List<UserDto> listOfUserDtos = _mapper.Map<List<UserDto>>(_dbContext.Users.ToList());
            listOfUserDtos.AddRange(_mapper.Map<List<UserDto>>(_dbContext.Deliverers.ToList()));
            UserDto userDto = new UserDto();

            foreach(UserDto u in listOfUserDtos)
            {
                if (u.Email == email)
                    userDto = u;             
            }
            return userDto;
        }

        public UserDto EditUserInDb(UserDto user)
        {
            if(user.TypeOfUser == "Deliverer")
            {
                List<Deliverer> listOfDeliverers = _dbContext.Deliverers.ToList();
                Deliverer changedDeliverer = _mapper.Map<Deliverer>(user);

                foreach (Deliverer d in listOfDeliverers)
                {
                    if (d.Email == changedDeliverer.Email)
                    {                     
                        d.Username = changedDeliverer.Username;
                        //d.Password = changedDeliverer.Password;
                        if(d.Password != changedDeliverer.Password)
                            d.Password = BCrypt.Net.BCrypt.HashPassword(changedDeliverer.Password); 
                        d.Name = changedDeliverer.Name;
                        d.LastName = changedDeliverer.LastName;
                        d.Address = changedDeliverer.Address;
                        d.DateOfBirth = changedDeliverer.DateOfBirth;
                        
                        _dbContext.SaveChanges();
                    }
                }
                return user;
            }
            else
            {
                List<User> listOfUsers = _dbContext.Users.ToList();

                User changedUser = _mapper.Map<User>(user);

                foreach (User u in listOfUsers)
                {
                    if (u.Email == changedUser.Email)
                    {
                        u.Username = changedUser.Username;
                        //u.Password = changedUser.Password;
                        if(u.Password != changedUser.Password)
                            u.Password = BCrypt.Net.BCrypt.HashPassword(changedUser.Password);
                        u.Name = changedUser.Name;
                        u.LastName = changedUser.LastName;
                        u.Address = changedUser.Address;
                        u.DateOfBirth = changedUser.DateOfBirth;
                        _dbContext.SaveChanges();
                    }
                }
                return user;
            }           
        }
        public List<DelivererDisplayDto> GetUnprocessedDeliverers() 
        {
            List<DelivererDisplayDto> listOfDeliverers = new List<DelivererDisplayDto>();
            List<Deliverer> deliverers = _dbContext.Deliverers.ToList();
            
            foreach (Deliverer u in deliverers)
            {
                if(u.Status == "processing")
                {
                    DelivererDisplayDto d = new DelivererDisplayDto();
                    d.Name = u.Name;
                    d.LastName = u.LastName;
                    d.Email = u.Email;
                    d.DateOfBirth = u.DateOfBirth;
                    d.Address = u.Address;
                    d.Status = u.Status;
                    d.TypeOfUser = u.TypeOfUser;

                    listOfDeliverers.Add(d);
                }
            }
            return listOfDeliverers;
        }

        public UserDto EditDeliverer(DelivererDisplayDto deliverer) 
        {
            List<Deliverer> listOfDeliverers = _dbContext.Deliverers.ToList();

            foreach(Deliverer user in listOfDeliverers)
            {
                if(user.Email == deliverer.Email)
                {
                    if (deliverer.Status == "denied")
                    {
                        user.Status = "denied";
                        _dbContext.SaveChanges();
                    }
                    else if (deliverer.Status == "accepted")
                    {
                        user.Status = "accepted";
                        _dbContext.SaveChanges();
                    }
                    return _mapper.Map<UserDto>(user);
                }
            }              
            return null;
        }

        public List<DelivererDisplayDto> GetAllDeliverers() 
        {
            List<DelivererDisplayDto> listOfDeliverers = new List<DelivererDisplayDto>();
            List<Deliverer> deliverers = _dbContext.Deliverers.ToList();

            foreach (Deliverer u in deliverers)
            {                
                    DelivererDisplayDto d = new DelivererDisplayDto();
                    d.Name = u.Name;
                    d.LastName = u.LastName;
                    d.Email = u.Email;
                    d.DateOfBirth = u.DateOfBirth;
                    d.Address = u.Address;
                    d.Status = u.Status;
                    d.TypeOfUser = u.TypeOfUser;

                    listOfDeliverers.Add(d);
            }
            return listOfDeliverers;
        }

        public TokenDto FindUsersId(string email)
        {
            User usr = _dbContext.Users.Where(x => x.Email == email).FirstOrDefault();
            if (usr == null)
                throw new UserNotFountException($"User with specified email {email} doesn't exist.");

            List<User> listOfUsers = _dbContext.Users.ToList();
            TokenDto tokenDto = new TokenDto();
            tokenDto.Token = "-1";

            foreach(User u in listOfUsers)
            {
                if (u.Email == email)
                    tokenDto.Token = u.Id.ToString();
            }
            return tokenDto;
        }

       
        public List<OrderDto> RetriveAllPreviousOrders(int id)
        {
            User us = _dbContext.Users.Find(id);
            if (us == null)
                throw new UserNotFountException($"User with specified id {id} doesn't exist.");

            List<User> listOfUsers = _dbContext.Users.Include(x => x.UserOrders).ToList();
            List<OrderDto> listOfOrderDtos = new List<OrderDto>();
            List<Order> orders = new List<Order>();
            foreach (User u in listOfUsers)
            {
                if (u.Id == id)
                    orders = u.UserOrders;                 
            }

            foreach(Order o in orders)
            {
                if(o.Status == "Done")
                    listOfOrderDtos.Add(_mapper.Map<OrderDto>(o));
            }
            //listOfOrderDtos = _mapper.Map<List<OrderDto>>(orders);
            return listOfOrderDtos;
        }

        public List<OrderDto> RetriveCurrentOrders(string email)
        {
            User usr = _dbContext.Users.Where(x => x.Email == email).FirstOrDefault();
            if (usr == null)
                throw new UserNotFountException($"User with specified email {email} doesn't exist.");

            List<User> listOfUsers = _dbContext.Users.Include(x => x.UserOrders).ToList();
            List<OrderDto> listOfOrderDtos = new List<OrderDto>();
            List<Order> orders = new List<Order>();
            foreach (User u in listOfUsers)
            {
                if (u.Email == email)
                    orders = u.UserOrders;
            }

            foreach (Order o in orders)
            {
                if (o.Status != "Done")
                    listOfOrderDtos.Add(_mapper.Map<OrderDto>(o));
            }
            //listOfOrderDtos = _mapper.Map<List<OrderDto>>(orders);
            return listOfOrderDtos;
        }

        public int FindDeliverersId(string email)
        {
            Deliverer del= _dbContext.Deliverers.Where(x => x.Email == email).FirstOrDefault();
            if (del == null)
                throw new UserNotFountException($"Deliverer with specified email {email} doesn't exist.");

            List<Deliverer> deliverers = _dbContext.Deliverers.ToList();
            foreach(Deliverer d in deliverers)
            {
                if (d.Email == email)
                    return d.Id;
            }
            return -1;
        }

        public TokenDto DeliverersInProcessOrder(string email)
        {
            Deliverer del = _dbContext.Deliverers.Where(x => x.Email == email).FirstOrDefault();
            if (del == null)
                throw new UserNotFountException($"Deliverer with specified email {email} doesn't exist.");

            List<Order> listOfAllOrders = new List<Order>();
            List<Deliverer> listOfAllDeliverers = _dbContext.Deliverers.Include(x => x.DelivererOrders).ToList();
            TokenDto tokenDto = new TokenDto();
            tokenDto.Token = "false";

            foreach(Deliverer deliverer in listOfAllDeliverers)
            {
                if(deliverer.Email == email)
                {
                    listOfAllOrders = deliverer.DelivererOrders;
                    break;
                }
            }

            foreach(Order order in listOfAllOrders)
            {
                if (order.Status == "inProcess")
                {
                    tokenDto.Token = "true";
                    return tokenDto;
                }                    
            }

            return tokenDto;
        }

        public List<OrderDisplayDto> PreviousDeliverersOrders(int id)
        {
            Deliverer del = _dbContext.Deliverers.Find(id);
            if (del == null)
                throw new DelivererNotFoundException($"Deliverer with specified id {id} doesn't exist. ");

            List<Deliverer> deliverers = _dbContext.Deliverers.Include(x => x.DelivererOrders).ToList();
            List<OrderDisplayDto> orderDisplayDtos = new List<OrderDisplayDto>();

            foreach(Deliverer d in deliverers)
            {
                if(d.Id == id)
                {
                    foreach(Order o in d.DelivererOrders)
                    {
                        if(o.Status != "inProcess")
                        {
                            orderDisplayDtos.Add(_mapper.Map<OrderDisplayDto>(o));                                
                        }
                    }
                    break;                    
                }
            }
            return orderDisplayDtos;            
        }

        public TokenDto UploadImage(IFormFile formFile, int userId, string typeOfUser)
        {
            TokenDto token = new TokenDto();

            if (typeOfUser == "Deliverer")
            {
                Deliverer deliverer = _dbContext.Deliverers.Find(userId);
                if (deliverer == null)
                    throw new UserNotFountException($"User with specified id {userId} doesn't exist.");

                deliverer.ImageURL = formFile.FileName;
                string filePath = Path.Combine(@$"UsersImages/Deliverer{userId}/", formFile.FileName);
                if (Directory.Exists(@$"UsersImages/Deliverer{userId}"))
                {
                    Directory.Delete(@$"UsersImages/Deliverer{userId}");
                }

                new FileInfo(filePath).Directory?.Create();
                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    formFile.CopyTo(stream);
                }

                _dbContext.SaveChanges();
            }
            else
            {
                User user = _dbContext.Users.Find(userId);
                if (user == null)
                    throw new UserNotFountException($"User with specified id {userId} doesn't exist.");

                user.ImageURL = formFile.FileName;

                string filePath = Path.Combine(@$"UsersImages/User{userId}/", formFile.FileName);
                if (Directory.Exists(@$"UsersImages/User{userId}"))
                {
                    Directory.Delete(@$"UsersImages/User{userId}");
                }

                new FileInfo(filePath).Directory?.Create();
                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    formFile.CopyTo(stream);
                }

                _dbContext.SaveChanges();
            }           

            return token;
        }

        public FileStream ReadImage(int userId, string imageURL, string typeOfUser)
        {
            if(typeOfUser == "Deliverer")
            {
                Deliverer deliverer = _dbContext.Deliverers.Find(userId);
                if(deliverer == null)
                    throw new UserNotFountException($"Deliverer with specified id {userId} doesn't exist.");
                FileStream stream = new FileStream(@$"UsersImages/Deliverer{userId}/{imageURL}", FileMode.Open);
                return stream;
            }
            else
            {
                User user = _dbContext.Users.Find(userId);
                if (user == null)
                    throw new UserNotFountException($"User with specified id {userId} doesn't exist.");
                FileStream stream = new FileStream(@$"UsersImages/User{userId}/{imageURL}", FileMode.Open);
                return stream;
            }            
        }

        public DelivererDto GetDelivererById(int id)
        {
            return _mapper.Map<DelivererDto>(_dbContext.Deliverers.Find(id));
        }
    }
}
