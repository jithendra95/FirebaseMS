using Domain;
using GrpcServer;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class DatabaseController  : ControllerBase
{
    private readonly ILogger<DatabaseController> _logger;
    private readonly IDatabaseService _databaseServer;

    public DatabaseController(ILogger<DatabaseController> logger, IDatabaseService databaseServer)
    {
        _logger = logger;
        _databaseServer = databaseServer;
    }
    
    [HttpGet]
    public Database Get()
    {
        return _databaseServer.GetDatabase();
    }
}