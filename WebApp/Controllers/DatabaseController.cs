using Microsoft.AspNetCore.Mvc;
using RpcContracts.DatabaseMessages;
using RpcContracts.Services;

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
    public IEnumerable<DatabaseMessage> GetAll()
    {
        return _databaseServer.GetDatabases();
    } 
    
    [HttpGet]
    [Route("{id}")]
    public DatabaseMessage Get(string id)
    {
        return _databaseServer.GetDatabase(id);
    }
}