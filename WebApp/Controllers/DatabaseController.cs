using GrpcService;
using Microsoft.AspNetCore.Mvc;
using RpcContracts.DatabaseMessages;

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
    public DatabaseMessage Get(string id)
    {
        return _databaseServer.GetDatabase(id);
    }
}