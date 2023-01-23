// See https://aka.ms/new-console-template for more information

using FirestoreDatabase;

Console.WriteLine();
var api = new RealtimeDbApi();

var tables = await api.ReadAll();
var realtimeDbService = new RealtimeDbService(tables);
