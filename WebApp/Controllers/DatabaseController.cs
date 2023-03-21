using Domain;
using Microsoft.AspNetCore.Mvc;
using RpcContracts.DatabaseMessages;
using RpcContracts.Services;

namespace WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly ILogger<DatabaseController> _logger;
    private readonly IDatabaseService _databaseServer;

    public DatabaseController(ILogger<DatabaseController> logger, IDatabaseService databaseServer)
    {
        _logger = logger;
        _databaseServer = databaseServer;
    }

    [HttpPost]
    public DatabaseMessage CreateDatabase([FromForm] IFormFile file, [FromForm] string databaseUrl, [FromForm] int databaseType)
    {
        var fileBase64 = string.Empty;
        if (file.Length > 0)
        {
            using var ms = new MemoryStream();
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();
            fileBase64 = Convert.ToBase64String(fileBytes);
            // act on the Base64 data
        }

        var databaseCreateMessage = new DatabaseCreateMessage
        {
            FileName = file.FileName,
            FileBase64 = fileBase64,
            DatabaseUrl = databaseUrl,
            DatabaseType = (DatabaseTypeEnum)databaseType
        };
        return _databaseServer.CreateDatabase(databaseCreateMessage);
    }

    [HttpGet]
    public IEnumerable<DatabaseMessage> GetAll()
    {
        return _databaseServer.GetDatabases();
    }

    [HttpGet]
    [Route("{id}")]
    public DatabaseMessage? Get(string id)
    {
        return _databaseServer.GetDatabase(id);
    }

    [HttpGet]
    [Route("{databaseId}/{id}")]
    public DatabaseTableMessage? GetDatabaseTable(string databaseId, string id)
    {
        var message = new DatabaseTableMessage { Path = id, DatabaseId = databaseId };
        return _databaseServer.GetDatabaseTable(message);
    }
    
    [HttpDelete]
    [Route("{id}")]
    public DatabaseDisconnectedMessage Delete(string id)
    {
        return _databaseServer.DisconnectDatabase(id);
    }
}