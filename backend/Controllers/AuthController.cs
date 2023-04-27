using System;
using System.Linq;
using backend.Models;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        ILogger<AuthController> _logger;
        private readonly IAuthRepository authRepository;

        public AuthController(ILogger<AuthController> logger, IAuthRepository authRepository)
        {
            _logger = logger;
            this.authRepository = authRepository;
        }

        [HttpPost("login")]
        public IActionResult Login(Users model)
        {
            try
            {
                (Users result, string token) = authRepository.Login(model);
                if (result == null)
                {
                    return Unauthorized(new { token = "", message = "username invalid" });
                }
                if (String.IsNullOrEmpty(token))
                {
                    return Unauthorized(new { token = "", message = "password invalid" });
                }
                return Ok(new { token = token, message = "Login Successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { token = "", message = ex.ToString() });
            }
        }

        [HttpPost("[action]")]
        public IActionResult Register(Users model)
        {
            try
            {
                authRepository.Register(model);
                return Ok(new { result = "OK", message = "Register successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { result = "NOK", message = ex.ToString() });
            }
        }

    }
}